<script setup lang='ts' >
import { computed, onUnmounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useStore} from '@/store';
import type { IBoard } from '@/interfaces'
import { BOARDS_ROUTE_NAME } from '@/router/routes'
import { useChangeMainBackground } from '@/hooks'
import Loader from '@/components/Loader.vue'
import {BoardModule} from '@/modules/board'

const store = useStore();
const router = useRouter();
const route = useRoute()
useChangeMainBackground('var(--background-board)');

const boardId: IBoard['id'] = route.params.boardId as IBoard['id'];

const redirectToBoards = () => {
  router.push({name: BOARDS_ROUTE_NAME})
};

const board = computed(() => store.state.board.board);
const isLoading = computed(() => store.state.board.isLoading);

const isShowContent = computed(() => !!board.value && !isLoading.value)

onBeforeMount(  () => {
  store.dispatch("board/GET", boardId)
    .then(() => store.dispatch("board/CONNECT", boardId))
    .catch(redirectToBoards);
})

onUnmounted(() => {
  store.commit("board/SET_BOARD", null)
  store.dispatch("board/DISCONNECT")
})
</script>

<template>
  <Loader :loading='isLoading'/>
  <BoardModule v-if='isShowContent'/>
</template>

<style scoped>
</style>
