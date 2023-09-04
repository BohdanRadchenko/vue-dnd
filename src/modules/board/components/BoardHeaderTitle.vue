<script setup lang='ts'>
import { ref } from 'vue'
import TypographyInput from '@/components/TypographyInput.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import CheckIcon from '@/assets/icons/CheckIcon.vue'

interface IProps {
  title: string;
  onRename: (value: string) => void;
}

const props = defineProps<IProps>()

const isEditing = ref<boolean>(false)
const title = ref(props?.title || "")

const onRename = (currentValue: string) => {
  const prevTitle = props.title;
  if(prevTitle === currentValue || !currentValue) {
    title.value = prevTitle;
    return;
  }
  isEditing.value=false
  props.onRename(currentValue);
}

const onFocus = () => {
  isEditing.value=true
}

</script>

<template>
 <div class='container'>
   <TypographyInput
     v-model='title'
     :onBlur='onRename'
     :onFocus='onFocus'
     @keypress.esc='isEditing=false'
     :placeholder='props.title'
     typography='title'
     variant='text'
     class='input'
   />
   <div
     class='button-wrapper'
     v-if="isEditing"
   >
    <ButtonIcon
      @click='onRename'
      class='button'
    >
      <CheckIcon/>
    </ButtonIcon>
   </div>
 </div>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
.input {
  width: 100%;
  padding-right: 34px;
}

.button-wrapper {
  z-index: 1;
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translateY(-50%);
}

</style>
