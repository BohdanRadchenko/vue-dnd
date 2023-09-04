<script  lang='ts' setup=''>
import BoardsCard from '@/modules/boards/BoardsCard.vue'
import { IBoard } from '@/interfaces'

interface IBoardsContentProps {
  boards: IBoard[]
}

const props = withDefaults(defineProps<IBoardsContentProps>(), {
  boards: [],
})
</script>

<template>
  <div class='wrapper' v-if='props.boards.length'>
    <BoardsCard
      v-for='board in props.boards'
      :key='board.id'
      :board='board'
    />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 20px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
