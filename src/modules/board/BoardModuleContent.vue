<script  setup lang='ts'>
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import Draggable from 'vuedraggable'
import BoardColumn from '@/modules/board/components/BoardColumn.vue'

const store = useStore();

const board = computed(() => store.state.board.board);

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

const getList1 = (index) => ({
  id: Date.now() + index * 33,
  title: 'list title ' + index,
  cards: [
    getCard(1), getCard(2), getCard(3), getCard(4), getCard(5),
  ]
})

const boardMock = ({
  title: "title",
  id: 123123,
  // lists: [getList(1), getList(2), getList(3), getList(4), getList(5)]
  // lists: [getList(1)]
  // lists: []
  lists: [getList1(1), getList1(2)]
})

const emit = defineEmits<{
  (e: 'reorder-commit', value: any): void
  (e: 'change', values: any): void
}>()

// const lists = ref(board.lists);

const columns = computed({
  get() {
    return board.value?.lists
  },
  set(value) {
    console.log('value', value);
    // lists.value = value;
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
        <BoardColumn
          :items='column'
          @reorder-change="onReorderChangeCards"
          @reorder-commit="onReorderCommitCards"
        />
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
