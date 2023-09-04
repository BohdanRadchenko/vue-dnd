<script  setup lang='ts'>
import { computed, onMounted, onUpdated, ref } from 'vue'
import Draggable from 'vuedraggable'
import BoardColumn from '@/modules/board/components/BoardColumn.vue'
import BoardCreateColumn from '@/modules/board/components/BoardCreateColumn.vue'

const getCard = (index) => ({
  id: Date.now() + index * 44,
  description: Date.now() + index * 44 + " card description",

})

const getList = (index) => ({
  id: Date.now() + index * 33,
  title: 'list title ' + index,
  cards: [
    getCard(1), getCard(2), getCard(3), getCard(4), getCard(5),
    getCard(11), getCard(22), getCard(33), getCard(44), getCard(55),
    getCard(111), getCard(222), getCard(333), getCard(444), getCard(555),
    getCard(1111), getCard(2222), getCard(3333), getCard(4444), getCard(5555),
    getCard(11111), getCard(22222), getCard(33333), getCard(44444), getCard(55555),
  ]
})

const board = ({
  title: "title",
  id: 123123,
  lists: [getList(1), getList(2), getList(3), getList(4), getList(5)]
})


const columns = computed({
  get() {
    return board.lists
  },
  set(value) {
    console.log('value', value);
  },
})


const containerRef = ref()
const buttonRef = ref()

onMounted(() => {
  if(!containerRef.value || !buttonRef.value) return;
  containerRef.value.targetDomElement.appendChild(buttonRef.value)
})

</script>

<template>
  <Draggable
    v-model='columns'
    class='board__list'
    item-key='id'
    tag='ul'
    ref='containerRef'
  >
    <template #item="{ element: column }">
      <li class='board__list-item'>
        <BoardColumn :items='column'/>
      </li>
    </template>
  </Draggable>
  <div ref='buttonRef' class='board__list-action'>
    <BoardCreateColumn ref='buttonRef'/>
  </div>
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

.board__list-action {
  /*position: absolute;*/
  /*top: 0;*/
  /*right: 0;*/
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
