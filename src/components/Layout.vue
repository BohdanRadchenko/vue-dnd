<script setup lang="ts">
import Header from '@/components/Header.vue'

</script>

<template>
 <div class='layout'>
   <Header/>
   <main>
     <slot/>
   </main>
 </div>
</template>

<style scoped>
.layout {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.layout main {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

</style>
