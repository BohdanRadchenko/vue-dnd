<script  setup lang='ts'>
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import Draggable from 'vuedraggable'
import BoardColumn from '@/modules/board/components/BoardColumn.vue'

const store = useStore();

const board = computed(() => store.state.board.board);

const columns = computed({
  get() {
    return board.value.lists
  },
  set(value) {
    console.log('columns value', value);

    console.log('commit', commit);
    // const cloned: Array<unknown> = cloneDeep(props.items?.cards || []);
    // const cardsWithOrder = [
    //   ...cloned?.map(({id}, index) => ({
    //     id,
    //     position: index * 1000 + 1000,
    //   })),
    // ];

    // console.log('cardsWithOrder', cardsWithOrder);

    // emit('reorder-change', {
    //   id: props?.items?.id,
    //   cards: cardsWithOrder,
    // });
  },
})

const onReorderLists = (value: any) => {
  console.log('values', value);
}

const onReorderEnds = (value: any) => {
  console.log('values', value);
}

const onReorderChangeCards = (data) => {
  console.log('data', data);
}

const onReorderCommitCards = () => {

}
</script>

<template>
  <Draggable
    v-model='columns'
    class='board__list'
    item-key='id'
    tag='ul'
    @change="onReorderLists"
    @end="onReorderEnds"
  >
    <template #item="{ element: column }">
      <li class='board__list-item'>
        <BoardColumn :item='column' />
      </li>
    </template>
  </Draggable>
</template>

<style scoped>
.board__list{
  margin: 0;
  padding: 14px 12px;
  align-items: start;
  overflow-x: auto;
  height: calc(100vh - 88px);
  display: grid;
  grid-auto-columns: 300px;
  grid-auto-flow: column;
  grid-column-gap: 20px;
  position: relative;
}

.board__list-item {
  list-style: none;
  margin: 0;
  padding: 0;
  height: auto;
  max-height: 100%;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
