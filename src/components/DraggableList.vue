<script setup lang='ts'>
import { ref } from 'vue'
import Draggable from "vuedraggable";
import type { IList, IBoard, ICard } from '@/interfaces'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import TypographyInput from '@/components/TypographyInput.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export interface IListProps {
  list: IList;
  groupId: number;
}

const store = useStore();
const route = useRoute()

const boardId: IBoard['id'] = Number(route.params.boardId);

const {
  list,
  groupId,
} = defineProps<IListProps>()

const isFocusedListTitle = ref<boolean>(false)
const cardTitle = ref<string>("");

const handleAddCard = () => {
  store.commit("createBoardCard", {
    listId: list.id,
    card: {description: cardTitle.value || "New card"},
    index: list.items.length,
    boardId
  })
  cardTitle.value = "";
}

const handleDeleteList = () => {
  const conf = confirm("Are you sure?");
  if(!conf) return;
  store.commit("removeBoardList", {
    boardId,
    listId: list.id,
  })
}

const handleDeleteCard = (cardId: ICard['id']) => {
  const conf = confirm("Are you sure?");
  if(!conf) return;
  store.commit("removeBoardCard", {
    boardId,
    cardId,
    listId: list.id
  })
}

const handleBlur = (v: string) => {
  isFocusedListTitle.value = false;
  store.commit("renameBoardList", {
    title: v,
    listId: list.id,
    boardId
  })
}

</script>

<template>
  <div class='list'>
    <div class='list__actions'>
      <TypographyInput
        :value='list.title'
        @focus='isFocusedListTitle = true'
        @blur='handleBlur'
        :typography='"title"'
        placeholder='Enter title...'
      />
      <Button @click='handleDeleteList' v-if='!isFocusedListTitle'>x</Button>
    </div>
  <draggable
    v-model:list='list.items'
    item-key='id'
    :group='groupId'
    tag='ul'
    class='list__items'
  >
    <template #item="{ element: item }">
      <Card
        :key="item.id"
        :card="item"
        :onRemove='handleDeleteCard'
      />
    </template>
  </draggable>
    <div class='list__footer'>
      <TypographyInput
        v-model='cardTitle'
        :variant='"outlined"'
        placeholder='Add new card...'
      />
      <Button @click='handleAddCard'>+</Button>
    </div>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background-color: var(--color-background-list);
  border-radius: 0.3rem;
  overflow: hidden;
}

.list__actions {
  padding: 6px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 52px;
}

.list__items {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  margin: 0;
  padding: 12px 8px;
  list-style: none;
}

.list__footer {
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
