<script setup lang='ts' >
import { ref } from 'vue'
import Draggable from 'vuedraggable'
import { useRoute } from 'vue-router'
import {cloneDeep} from 'lodash';
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
const emit = defineEmits<{
  (e: 'reorder-commit', value: any): void
  (e: 'change', values: any): void
}>()


const cards = ref(props.items.cards || [])

const handleRename = () => {

}

const onReorderCards = (commit: any) => {
  console.log('commit', commit);
  const cloned: Array<unknown> = cloneDeep(props.items?.cards || []);
  const cardsWithOrder = [
    ...cloned?.map(({id, description}, index) => ({
      id,
      description,
      position: index * 1000 + 1000,
    })),
  ];

  emit('reorder-change', {
    id: props?.items?.id,
    cards: cardsWithOrder,
  });
}

const onReorderEnds = (value: any) => {
  console.log('onReorderEnds values', value);
}

</script>

<template>
  <Card class='board__column'>
    <div class='board__column-header'>
      <BoardHeaderTitle :title='props.items.title' :onAction='handleRename'/>
    </div>
    <Draggable
      v-model='cards'
      item-key='id'
      :group='boardId'
      class='board__column-main'
      tag='ul'
      @change="onReorderCards"
      @end="onReorderEnds"
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
