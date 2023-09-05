<script setup lang='ts' >
import { ICard } from '@/interfaces'
import ButtonIcon from '@/components/ButtonIcon.vue'
import Typography from '@/components/Typography.vue'

interface IBoardCardProps {
  card: ICard
}

const props = defineProps<IBoardCardProps>()
const emit = defineEmits<{
  (e: "delete", value: ICard['_id']): void
}>()

const handleDelete = () => {
  const conf = confirm("Are you sure?");
  if(!conf) return;
  emit("delete", props.card._id)
}

</script>

<template>
 <div class='board__card'>
   <div class='board__card-header'>
     <Typography :variant='"subtitle"'>
       {{props.card._id}}
     </Typography>
     <ButtonIcon @click='handleDelete'>x</ButtonIcon>
   </div>
   <div class='board__card-text'>
     <Typography>
       {{props.card.description}}
     </Typography>
   </div>
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
  padding: 8px;
}

.board__card:focus {
  border: 1px solid var(--dynamic-text-transparent);
  overflow-wrap: break-word;
  width: 100%;
  overflow: hidden;
}

.board__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.board__card-text {
  overflow-wrap: break-word;
  width: 100%;
}
</style>
