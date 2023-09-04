<script setup lang='ts' >
import BoardModuleHeader from '@/modules/board/BoardModuleHeader.vue'
import BoardModuleContent from '@/modules/board/BoardModuleContent.vue'
</script>

<template>
 <div class='board'>
   <BoardModuleHeader/>
   <BoardModuleContent/>
 </div>
</template>

<style scoped>
.board {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
