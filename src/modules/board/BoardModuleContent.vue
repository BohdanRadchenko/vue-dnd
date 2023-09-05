<script  setup lang='ts'>
import { computed } from 'vue'
import { useStore } from '@/store'
import Draggable from 'vuedraggable'
import BoardColumn from '@/modules/board/components/BoardColumn.vue'
import type { IList } from '@/interfaces'

const store = useStore();

const board = computed(() => store.state.board.board);

const columns = computed({
  get() {
    return board.value.lists
  },
  set(value: IList[]) {
    const orderedArr = value.map(({_id}, pos) => ({_id, pos }))
    store.dispatch('board/LIST_REORDER', orderedArr)
  }
})

</script>

<template>
  <Draggable
    v-model='columns'
    class='board__list'
    item-key='id'
    tag='ul'
  >
    <template #item="{ element: column }">
      <li class='board__list-item'>
        <BoardColumn :item='column'/>
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
