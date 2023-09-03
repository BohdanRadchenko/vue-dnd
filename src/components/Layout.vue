<script setup lang="ts">
import Header from '@/components/Header.vue'

</script>

<template>
 <div class='card'>
   <Header/>
   <main>
     <slot/>
   </main>
 </div>
</template>

<style scoped>
.card {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

main {
  width: 100%;
  max-height: calc(100vh - 48px);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

</style>
