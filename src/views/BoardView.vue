<script setup lang='ts' >
import { onMounted, computed, ref, onUnmounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useStore} from 'vuex';
import type { IBoard } from '@/interfaces'
import { BOARDS_ROUTE_NAME } from '@/router/routes'
import { useWindowBeforeUnload, useChangeMainBackground } from '@/hooks'
import DraggableList from '@/components/DraggableList.vue'
import Button from '@/components/Button.vue'
import TypographyInput from '@/components/TypographyInput.vue'
import Loader from '@/components/Loader.vue'
import {BoardModule} from '@/modules/board'
import { SocketInstance } from '@/api/SocketInstance'

const store = useStore();
const router = useRouter();
const route = useRoute()
useChangeMainBackground('var(--background-board)');

const boardId: IBoard['id'] = route.params.boardId as IBoard['id'];

const redirectToBoards = () => {
  router.push({name: BOARDS_ROUTE_NAME})
};

const board = computed(() => store.getters['board/getBoard']);
const isLoading = computed(() => store.getters['board/isLoading']);

const isShowContent = computed(() => !!board.value && !isLoading.value)

const title = ref(board?.value?.title || "")

watchEffect(() => {
  title.value = board?.value?.title || ""
})

// const handleRemoveBoard = () => {
//   const conf = confirm("Are you sure?");
//   if(!conf) return;
//   store.dispatch("boards/DELETE", boardId)
//   redirectToBoards();
// }
//
// const handleTitleBlur = (currentValue: string) => {
//   const prevTitle = board?.value?.title;
//   if(prevTitle === currentValue || !currentValue) return;
//   store.dispatch(
//     "boards/UPDATE",
//     { _id: boardId, title: currentValue }
//   )
// }

onMounted(  () => {
  store.dispatch("board/GET", boardId)
    .then(() => store.dispatch("board/CONNECT", boardId))
    .catch(redirectToBoards);
})

onUnmounted(() => {
  store.commit("board/SET_BOARD", {board: null})
  store.dispatch("board/DISCONNECT")
})

</script>

<template>
  <Loader :loading='isLoading'/>
    <BoardModule v-if='isShowContent'/>
<!--  <div class='board__container' v-if='isShowContent'>-->
<!--    <DraggableList-->
<!--      v-for="item in lists"-->
<!--      :key="item.id"-->
<!--      :groupId='board.id'-->
<!--      :list='item'-->
<!--    />-->
<!--    <div class='board__container__buttons'>-->
<!--      <Button @click='store.commit("createBoardList", boardId)'>+</Button>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>
.board__container {
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

.board__container__buttons {
  padding-top: 4px;
}
</style>
