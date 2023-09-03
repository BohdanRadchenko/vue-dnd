<script  setup lang='ts'>
import { ref } from 'vue'
import Draggable from 'vuedraggable'
import BoardColumn from '@/components/BoardColumn.vue'
import BoardCard from '@/components/BoardCard.vue'

const lists = ref([
  {id: 1, title: "list 1", items: [{id: 11, title: "11", items: [{id: 111, description: "111"}, {id: 1111, description: "1111"}]}]},
  {id: 2, title: "list 2", items: [{id: 22, title: "22", items: [{id: 222, description: "222"}, {id: 2222, description: "2222"}]}]},
  {id: 3, title: "list 3", items: [{id: 33, title: "33", items: [{id: 333, description: "333"}, {id: 3333, description: "3333"}]}]},
  {id: 4, title: "list 4", items: [
    {id: 939, title: "33", items: [{id: 393, description: "333"}, {id: 3993, description: "3333"}]},
    {id: 838, title: "33", items: [{id: 383, description: "333"}, {id: 3883, description: "3333"}]},
    {id: 737, title: "33", items: [{id: 373, description: "333"}, {id: 3773, description: "3333"}]},
    {id: 636, title: "33", items: [{id: 363, description: "333"}, {id: 3663, description: "3333"}]},
    {id: 535, title: "33", items: [{id: 353, description: "333"}, {id: 3553, description: "3333"}]},
    {id: 434, title: "33", items: [{id: 343, description: "333"}, {id: 3443, description: "3333"}]},
    {id: 333, title: "33", items: [{id: 333, description: "333"}, {id: 3333, description: "3333"}]},
    {id: 232, title: "33", items: [{id: 323, description: "333"}, {id: 3223, description: "3333"}]},
    {id: 131, title: "33", items: [{id: 313, description: "333"}, {id: 3113, description: "3333"}]},
    {id: 383, title: "33", items: [{id: 383, description: "333"}, {id: 3883, description: "3333"}]},
    {id: 373, title: "33", items: [{id: 373, description: "333"}, {id: 3773, description: "3333"}]},
    {id: 363, title: "33", items: [{id: 363, description: "333"}, {id: 3663, description: "3333"}]},
    {id: 353, title: "33", items: [{id: 353, description: "333"}, {id: 3553, description: "3333"}]},
    {id: 343, title: "33", items: [{id: 343, description: "333"}, {id: 3443, description: "3333"}]},
    {id: 333, title: "33", items: [{id: 333, description: "333"}, {id: 3333, description: "3333"}]},
    {id: 323, title: "33", items: [{id: 323, description: "333"}, {id: 3223, description: "3333"}]},
    {id: 313, title: "33", items: [{id: 313, description: "333"}, {id: 3113, description: "3333"}]},
    ]
  },
])

</script>

<template>
  <Draggable
    v-model:list='lists'
    class='board__list'
    item-key='id'
    tag='ul'
  >
    <template #item="{ element: list }">
      <BoardColumn v-model:titleValue='list.title'>
        <Draggable
          v-model:list='list.items'
          item-key='id'
          :group='1'
          class='board__card-list'
          tag='ul'
        >
          <template #item="{ element: card }">
              <BoardCard :card='card'/>
          </template>
        </Draggable>
      </BoardColumn>
    </template>
  </Draggable>
</template>

<style scoped>
.board__container {
}
.board__list{
  margin: 0;
  padding: 14px 12px;
  list-style: none;
  align-items: start;
  overflow-x: auto;
  height: calc(100vh - 88px);
  display: grid;
  grid-auto-columns: 300px;
  grid-auto-flow: column;
  grid-column-gap: 20px;
}
.board__card-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
}
</style>
