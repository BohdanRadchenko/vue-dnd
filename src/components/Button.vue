<script setup lang='ts'>
import ButtonBase from '@/components/ButtonBase.vue'
import Typography from '@/components/Typography.vue'

export interface IButtonProps {
  text?: string;

}

const props = defineProps<IButtonProps>()

</script>

<template>
  <ButtonBase class='button'>
    <Typography :variant='"subtitle"'>
      <slot/>
      {{props.text}}
    </Typography>
  </ButtonBase>
</template>

<style scoped>
.button {
  border: 1px solid var(--dynamic-text-transparent);
  border-radius: .25rem;
  margin: 0;
  background-color: #fcfcfc;
}
</style>
