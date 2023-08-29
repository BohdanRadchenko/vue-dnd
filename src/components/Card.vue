<script setup lang='ts'>
import { ICard } from '@/interfaces'
import Typography from '@/components/Typography.vue'
import Button from '@/components/Button.vue'

export interface ICardProp {
  card: ICard;
  onRemove: (id: ICard['id']) => void;
}

const { card, onRemove } = defineProps<ICardProp>()

</script>

<template>
   <span class='card'>
     <Typography>
       {{card.description}}
     </Typography>
     <Button
       @click='onRemove(card.id)'
       :size='"sm"'
     >
       x
     </Button>
   </span>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  min-height: 40px;
  padding: 10px 8px;
  background-color: var(--color-background-card);
  border-radius: 0.3rem;
  margin-bottom: 10px;
  word-wrap: break-word;
  cursor: pointer;
}
.card:last-of-type {
  margin-bottom: 0;
}

</style>
