<script setup lang='ts'>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { IBoard } from '@/interfaces'
import { BOARDS_PAGE_ROUTE_NAME } from '@/router/routes'
import Typography from '@/components/Typography.vue'
import Button from '@/components/Button.vue'

export interface IBoardCardProps {
  board: IBoard
}

const store = useStore();
const router = useRouter();

const {board} = defineProps<IBoardCardProps>()

const handleRedirect = (e) => {
  e.stopPropagation();
  router.push({name: BOARDS_PAGE_ROUTE_NAME, params: {boardId: board.id}})
}

const handleDelete = (e) => {
  e.stopPropagation();
  const conf = confirm("Are you sure?");
  if(!conf) return;
  store.dispatch("boards/DELETE", board.id)
}

</script>

<template>
 <div class='card' @click='handleRedirect'>
   <div class='card__content'>
     <Typography :text='board._id'/>
     <Typography :text='board.title' :variant='"title"'/>
     <div class='card__content-wrap'>
       <Typography text='items:'/>
       <Typography :text='board?.items?.length' :variant='"sm"'/>
     </div>
   </div>
   <div class='card__actions'>
     <Button @click='handleDelete'>x</Button>
   </div>
 </div>
</template>

<style scoped>
.card {
  padding: 20px;
  cursor: pointer;
  border-radius: 3rem;
  background-color: var(--color-background-list);
  display: flex;
  justify-content: space-between;
}

.card__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card__content-wrap {
  display: flex;
  align-items: baseline;
}
</style>
