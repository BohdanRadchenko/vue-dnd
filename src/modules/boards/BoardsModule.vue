<script setup lang='ts'>
import BoardsCreate from '@/modules/boards/BoardsCreate.vue'
import BoardsContent from '@/modules/boards/BoardsContent.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore();

const ownerBoards = computed(() => store.getters['boards/getOwnerBoards'])
const accessedBoards = computed(() => store.getters['boards/getAccessedBoards'])

</script>

<template>
  <div class='container'>
    <BoardsCreate/>
    <BoardsContent :boards='ownerBoards'/>
    <br/>
    <BoardsContent :boards='accessedBoards'/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-height: 100%;
  overflow: auto;
}
</style>
