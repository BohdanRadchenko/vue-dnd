<script setup lang='ts'>
import { ref } from 'vue'
import Draggable from "vuedraggable";
import DraggableList from'./DraggableList.vue';

const lists = ref([
  {id: 1, title: "list 1", items: [{id: 11, title: "11", items: [{id: 111, description: "111"}, {id: 1111, description: "1111"}]}]},
  {id: 2, title: "list 2", items: [{id: 22, title: "22", items: [{id: 222, description: "222"}, {id: 2222, description: "2222"}]}]},
  {id: 3, title: "list 3", items: [{id: 33, title: "33", items: [{id: 333, description: "333"}, {id: 3333, description: "3333"}]}]},
])

console.log('lists.value', lists.value);

</script>

<!--<DraggableList-->
<!--  v-for="i in item.items"-->
<!--  :key="i.id"-->
<!--  :groupId='1'-->
<!--  :list='i'-->
<!--/>-->


<template>
  <draggable v-model:list='lists' class='board__list' item-key='id'>
    <template #item="{ element: brand }">
      <div class='board__list-item'>
        Board list {{brand.title}}
      <draggable v-model:list='brand.items' class='list' item-key='id' :group='1'>
        <template #item="{ element: content }">
          <div class='card'>
            Card {{ brand.id }} {{ content.id }}
          </div>
        </template>
      </draggable>
      </div>
    </template>
  </draggable>
</template>

<style scoped>
.board__list {
  height: 100%;
  flex-grow: 1;
  padding: 10px;
  align-items: start;
  display: grid;
  grid-auto-columns: 300px;
  grid-auto-flow: column;
  grid-column-gap: 20px;
  overflow: auto hidden;
}

.board__list-item {
  background-color: red;
}

.list {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  background-color: green;
  gap: 20px;
}

.card {
  width: 100%;
  height: 50px;
  background-color: #ccc;
}

</style>
