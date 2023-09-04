<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { BOARDS_ROUTE_NAME } from '@/router/routes'
import ButtonIcon  from '@/components/ButtonIcon.vue'
import { IBoard } from '@/interfaces'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import LeftIcon from '@/assets/icons/LeftIcon.vue'
import BoardHeaderTitle from '@/modules/board/components/BoardHeaderTitle.vue'

const store = useStore();
const router = useRouter();
const route = useRoute()

const boardId: IBoard['id'] = route.params.boardId as IBoard['id'];
const board = computed(() => store.getters['board/getBoard']);

const onRename = (title: string) => {
  store.dispatch("board/UPDATE", {title})
}

const redirectToBoards = () => {
  router.push({name: BOARDS_ROUTE_NAME});
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
    <div class='board__header-left'>
      <ButtonIcon @click='redirectToBoards'>
        <LeftIcon/>
      </ButtonIcon>
      <BoardHeaderTitle
        :title='board.title'
        :onRename='onRename'
      />
    </div>
   <ButtonIcon @click='handleRemoveBoard'>
     <DeleteIcon/>
   </ButtonIcon>
  </section>
</template>

<style scoped>
.board__header {
  padding: 6px 20px;
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

</style>
