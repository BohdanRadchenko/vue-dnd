<script setup lang='ts' >
import { computed } from 'vue'
import TypographyInput from '@/components/TypographyInput.vue'

interface IBoardColumnProps {
  titleValue?: string;
  createValue?: string;
  onChangeTitle?: (value: string) => void;
}

const props = defineProps<IBoardColumnProps>()
const emit = defineEmits(['update:titleValue', 'update:createValue'])

const titleValue = computed({
  get() {
    return props.titleValue
  },
  set(value) {
    emit('update:titleValue', value)
  }
})

const test = (prop) => {
  console.log('prop value', prop);
  console.log('props.titleValue', props.titleValue);
  console.log('titleValue', titleValue);
}


</script>

<template>
 <div class='board__column'>
   <div class='board__column-header'>
     <TypographyInput
       v-model='titleValue'
       :onBlur='test'
       :placeholder='props.titleValue'
       typography='title'
       variant='text'
     />
   </div>
   <div class='board__column-main'>
     <slot/>
   </div>
   <div class='board__column-footer'>
     footer
   </div>
 </div>
</template>

<style scoped>
.board__column {
  background-color: var(--column-background-color);
  border-radius: 12px;
  padding: 0 8px;
  margin: 0;
  max-height: calc(100% - 4px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.board__column-main {
  width: 100%;
  height: auto;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;

}

</style>
