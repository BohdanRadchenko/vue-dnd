<script  lang='ts' setup=''>
import BoardsCard from '@/modules/boards/BoardsCard.vue'
import Typography from '@/components/Typography.vue'
import { IBoard } from '@/interfaces'

interface IBoardsContentProps {
  boards: IBoard[];
  title: string;
}

const props = withDefaults(defineProps<IBoardsContentProps>(), {
  boards: [],
  title: "",
})
</script>

<template>
  <div  v-if='props.boards.length'>
    <Typography :text='props.title' variant='title'/>
    <div class='wrapper'>
      <BoardsCard
        v-for='board in props.boards'
        :key='board.id'
        :board='board'
      />
    </div>
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
