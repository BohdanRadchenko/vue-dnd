<script setup lang='ts'>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { BOARDS_ROUTE_NAME } from '@/router/routes'
import TypographyInput from '@/components/TypographyInput.vue'
import { computed, ref, watchEffect } from 'vue'

const store = useStore();
const router = useRouter();

const board = computed(() => store.getters['board/getBoard']);
const title = ref(board?.value?.title || "")

watchEffect(() => {
  title.value = computed(() => store.getters['board/getBoard'])?.value?.title;
})

const redirectToBoards = () => {
  router.push({name: BOARDS_ROUTE_NAME});
}

const handleTitleBlur = (currentValue: string) => {
  const prevTitle = board?.value?.title;
  if(prevTitle === currentValue || !currentValue) return;
  store.dispatch("board/UPDATE", {title: currentValue})
}

</script>

<template>
 <div class='board__header'>
    <button @click='redirectToBoards'>Back</button>
    <TypographyInput
      v-model='board.title'
      :onBlur='handleTitleBlur'
      :placeholder='board.title'
      typography='title'
      variant='text'
    />
 </div>
</template>

<style scoped>
.board__header {
  padding: 0 20px;
  background-color: var(--board-header-background-color);
  backdrop-filter: blur(4px);
  display: flex;
  gap: 20px;
}

</style>
