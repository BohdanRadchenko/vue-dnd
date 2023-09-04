<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { BOARDS_ROUTE_NAME } from '@/router/routes'
import TypographyInput from '@/components/TypographyInput.vue'
import ButtonIcon  from '@/components/ButtonIcon.vue'
import { IBoard } from '@/interfaces'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import LeftIcon from '@/assets/icons/LeftIcon.vue'

const store = useStore();
const router = useRouter();
const route = useRoute()

const boardId: IBoard['id'] = route.params.boardId as IBoard['id'];
const board = computed(() => store.getters['board/getBoard']);
const title = ref(board?.value?.title || "")

const redirectToBoards = () => {
  router.push({name: BOARDS_ROUTE_NAME});
}

const handleTitleBlur = (currentValue: string) => {
  const prevTitle = board?.value?.title;
  if(prevTitle === currentValue || !currentValue) {
    title.value = prevTitle;
    return;
  }
  store.dispatch("board/UPDATE", {title: currentValue})
}


const handleRemoveBoard = () => {
  const conf = confirm("Are you sure?");
  if(!conf) return;
  store.dispatch("boards/DELETE", boardId)
  redirectToBoards();
}

</script>

<template>
  <section class='board__header'>
    <ButtonIcon @click='redirectToBoards'>
      <LeftIcon/>
    </ButtonIcon>
    <TypographyInput
      v-model='title'
      :onBlur='handleTitleBlur'
      :placeholder='board.title'
      typography='title'
      variant='text'
    />
   <ButtonIcon @click='handleRemoveBoard'>
     <DeleteIcon/>
   </ButtonIcon>
  </section>
</template>

<style scoped>
.board__header {
  padding: 0 20px;
  background-color: var(--board-header-background-color);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: 20px;
}

</style>
