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
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
