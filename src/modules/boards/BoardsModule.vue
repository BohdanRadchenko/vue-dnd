<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from '@/store'
import BoardsCreate from '@/modules/boards/BoardsCreate.vue'
import BoardsContent from '@/modules/boards/BoardsContent.vue'
import Typography from '@/components/Typography.vue'

const store = useStore();

const ownerBoards = computed(() => store.getters['boards/getOwnerBoards'])
const accessedBoards = computed(() => store.getters['boards/getAccessedBoards'])

</script>

<template>
  <div class='container'>
    <Typography
      v-if='!ownerBoards.length && !accessedBoards.length'
      text='Create new board'
      variant='title'
      class='notify'
    />
    <BoardsCreate/>
    <BoardsContent :boards='ownerBoards' title='Your boards'/>
    <BoardsContent :boards='accessedBoards' title='Other boards'/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100%;
  max-height: 100%;
  overflow: auto;
  flex-grow: 1;
}

.notify {
  align-self: center;
}
</style>
