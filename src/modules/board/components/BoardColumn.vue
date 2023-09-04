<script setup lang='ts' >
import { computed } from 'vue'
import Draggable from 'vuedraggable'
import { useRoute } from 'vue-router'
import { IBoard } from '@/interfaces'
import Card from '@/components/Card.vue'
import BoardCard from '@/modules/board/components/BoardCard.vue'
import BoardCreateCard from '@/modules/board/components/BoardCreateCard.vue'
import BoardHeaderTitle from '@/modules/board/components/BoardHeaderTitle.vue'

interface IBoardColumnProps {
  titleValue?: string;
  createValue?: string;
  onChangeTitle?: (value: string) => void;
  items: {id: number, title: string, cards: {}[]}
}

const route = useRoute()
const boardId: IBoard['id'] = route.params.boardId as IBoard['id'];

const props = defineProps<IBoardColumnProps>()

const cards = computed({
  get() {
    return props.items.cards;
  },
  set(value) {
    console.log('value', value);
  },
})

const handleRename = () => {

}


</script>

<template>
  <Card class='board__column'>
    <div class='board__column-header'>
      <BoardHeaderTitle :title='props.items' :onRename='handleRename'/>
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
          <BoardCard :card='card'/>
        </li>
      </template>
    </Draggable>
    <div class='board__column-footer'>
      <BoardCreateCard/>
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
  padding: 4px 0 0;
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
