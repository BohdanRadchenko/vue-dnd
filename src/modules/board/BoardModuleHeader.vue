<script setup lang='ts'>
import {debounce, DebouncedFunc} from 'lodash'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { BOARDS_ROUTE_NAME } from '@/router/routes'
import ButtonIcon  from '@/components/ButtonIcon.vue'
import TypographyInput  from '@/components/TypographyInput.vue'
import { IBoard } from '@/interfaces'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import LeftIcon from '@/assets/icons/LeftIcon.vue'
import BoardCreateColumn from '@/modules/board/components/BoardCreateColumn.vue'

const store = useStore();
const router = useRouter();
const route = useRoute()

const boardId: IBoard['id'] = route.params.boardId as IBoard['id'];
const board = computed(() => store.state.board.board);

const redirectToBoards = () => {
  router.push({name: BOARDS_ROUTE_NAME});
}

const handleRemoveBoard = () => {
  const conf = confirm("Are you sure?");
  if(!conf) return;
  store.dispatch("boards/DELETE", boardId)
  redirectToBoards();
}

const handleCreateColumn = (title: string) => {
  store.dispatch("board/LIST_CREATE", {title})
}

const dispatchChangeTitle = (title: string) => {
  if(!title) return;
  return store.dispatch("board/UPDATE", { title })
}

const dispatchChangeTitleDebounce = debounce(dispatchChangeTitle, 2000) as Function & DebouncedFunc

const handleTitleEnter = (target: HTMLInputElement) => {
  dispatchChangeTitleDebounce.flush.call(target.value)
  target.blur();
}

const title = computed({
  get() {
    return board.value.title;
  },
  set(value: string) {
    dispatchChangeTitleDebounce(value);
  }
})
</script>

<template>
  <section class='board__header'>
    <div class='board__header-left'>
      <ButtonIcon @click='redirectToBoards'>
        <LeftIcon/>
      </ButtonIcon>
      <TypographyInput
        ref='titleRef'
        v-model='title'
        @blur='dispatchChangeTitleDebounce.cancel.call("")'
        @keypress.enter='handleTitleEnter($event.target)'
        :placeholder='board.title'
        typography='title'
        variant='text'
        class='input'
      />
    </div>
    <div class='board__header-actions'>
      <BoardCreateColumn @submit='handleCreateColumn'/>
      <ButtonIcon @click='handleRemoveBoard'>
        <DeleteIcon/>
      </ButtonIcon>
    </div>
  </section>
</template>

<style scoped>
.board__header {
  padding: 2px 20px;
  background-color: var(--board-header-background-color);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board__header-left {
  display: flex;
  gap: 20px;
  align-items: center;
}

.board__header-actions {
  display: flex;
  align-items: center;
  gap: 20px
}

</style>
