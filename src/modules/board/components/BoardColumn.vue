<script setup lang='ts' >
import { computed,} from 'vue'
import Draggable from 'vuedraggable'
import { useRoute } from 'vue-router'
import {cloneDeep} from 'lodash';
import { useStore } from '@/store'
import { IBoard, ICard, IList } from '@/interfaces'
import Card from '@/components/Card.vue'
import BoardCard from '@/modules/board/components/BoardCard.vue'
import BoardCreateCard from '@/modules/board/components/BoardCreateCard.vue'
import BoardHeaderTitle from '@/modules/board/components/BoardHeaderTitle.vue'
import ButtonIcon  from '@/components/ButtonIcon.vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'

interface IBoardColumnProps {
  item: IList
}

const store = useStore();
const route = useRoute()

const boardId: IBoard['id'] = route.params.boardId as IBoard['id'];

const props = defineProps<IBoardColumnProps>()
const emit = defineEmits<{
  (e: 'reorder-commit', value: any): void
  (e: 'change', values: any): void
}>()

const handleDeleteList = () => {
  store.dispatch('board/LIST_DELETE', {listId: props.item._id})
}

const cards = computed({
  get() {
    return props.item.cards;
  },
  set(value) {
    store.dispatch(
      'board/LIST_UPDATE',
      {
        _id: props.item._id,
        cards: value
      }
    )
  },
})

const handleRename = (title) => {
  store.dispatch(
    'board/LIST_UPDATE',
    { _id: props.item._id, title }
  )
}

const handleCreateCard = (description) => {
  store.dispatch(
    'board/LIST_UPDATE',
    {
      _id: props.item._id,
      cards: [
        ...cards.value,
        {_id: Date.now(), description}
      ]
    }
  )
}

const handleDeleteCard = (id: ICard['_id']) => {
  store.dispatch(
    'board/LIST_UPDATE',
    {
      _id: props.item._id,
      cards: [...cards.value].filter(({_id}) => id !== _id)
    }
  )
}

</script>

<template>
  <Card class='board__column'>
    <div class='board__column-header'>
      <BoardHeaderTitle :title='props.item.title' :onAction='handleRename'/>
      <ButtonIcon @click='handleDeleteList'>
        <DeleteIcon/>
      </ButtonIcon>
    </div>
    <Draggable
      v-model='cards'
      item-key='id'
      :group='boardId'
      class='board__column-main'
      tag='ul'
    >
      <template #item="{ element: card }">
        <li>
          <BoardCard
            :card='card'
            @delete='handleDeleteCard'
          />
        </li>
      </template>
    </Draggable>
    <div class='board__column-footer'>
      <BoardCreateCard
        @create='handleCreateCard'
      />
    </div>
  </Card>
</template>

<style scoped>
.board__column {
  padding: 0 8px;
  margin: 0;
  height: auto;
  max-height: calc(100% - 4px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.board__column-header {
  padding: 8px 0 0;
  display: flex;
  align-items: center;
  gap: 20px;
}

.board__column-main {
  overflow: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 100%;
  margin: 0;
  padding: 10px 0;
  gap: 12px;
}

</style>
