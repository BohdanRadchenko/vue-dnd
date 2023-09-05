<script setup lang='ts'>
import { ref } from 'vue'
import TypographyInput from '@/components/TypographyInput.vue'

interface IProps {
  title?: string;
  onAction: (value: string) => void;
}

const props = withDefaults(defineProps<IProps>(), {
  title: "",
})

const isEditing = ref<boolean>(false)
const title = ref<string>(props.title as string)

const handleReset = () => {
  isEditing.value = false;
  title.value = props.title;
}

const handleAction = () => {
  const prevTitle = props.title;
  const currentValue = title.value;
  if(prevTitle === currentValue || !currentValue) {
    title.value = prevTitle;
    return;
  }
  props.onAction(currentValue);
  isEditing.value = false;
}

</script>

<template>
   <TypographyInput
     v-model='title'
     @blur='handleReset'
     @focus='isEditing = true'
     @keypress.esc='handleReset'
     @keypress.enter='handleAction'
     :placeholder='props.title'
     typography='title'
     variant='text'
     class='input'
   />
</template>
