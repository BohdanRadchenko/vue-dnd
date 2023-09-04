<script setup lang='ts' >
import { ICard } from '@/interfaces'

interface IBoardCardProps {
  card: ICard
}

const props = defineProps<IBoardCardProps>()
</script>

<template>
 <div class='board__card'>
   {{props.card.id}} {{props.card.description}}
 </div>
</template>

<style scoped>
.board__card {
  background-color: var(--card-background-color);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  min-height: 44px;
  scroll-margin: 8px;
  padding: 8px 8px 4px 12px;
}

.board__card:focus {
  border: 1px solid var(--dynamic-text-transparent);
}
</style>
