<script setup lang='ts' >
import ButtonBase from '@/components/ButtonBase.vue'

</script>

<template>
 <ButtonBase class='button-icon'>
   <slot/>
 </ButtonBase>
</template>

<style scoped>
.button-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ds-shadow-raised-1);
  box-shadow: var(--ds-shadow-raised-1);
}


</style>
