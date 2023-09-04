<script setup lang='ts'>
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import type { IBoard } from '@/interfaces'
import { BOARDS_PAGE_ROUTE_NAME } from '@/router/routes'
import Typography from '@/components/Typography.vue'
import Card from '@/components/Card.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'

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
  <Card @click='handleRedirect' class='card'>
    <div class='card__content'>
      <Typography :text='board.title' :variant='"title"'/>
      <Typography :text='board.id'/>
    </div>
    <div class='card__actions'>
      <ButtonIcon @click='handleDelete'>
        <DeleteIcon/>
      </ButtonIcon>
    </div>
  </Card>
</template>

<style scoped>
.card {
  padding: 14px 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: all .3s ease-in-out;
  box-shadow: var(--ds-shadow-raised-1);
  min-height: 200px;
}

.card:hover {
  border: 1px solid var(--ds-shadow-raised-1);
  background: linear-gradient(151deg, rgba(241,242,244,1) 34%, rgba(215,209,209,1) 74%, rgba(215,215,215,1) 100%);
}

.card__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
