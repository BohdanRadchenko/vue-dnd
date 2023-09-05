<script setup lang='ts'>
import { computed, ref, watchEffect } from 'vue'
import TypographyInput from '@/components/TypographyInput.vue'

interface IProps {
  title?: string;
  onAction: (value: string) => void;
}

const props = withDefaults(defineProps<IProps>(), {
  title: "",
})

const isEditing = ref<boolean>(false)
const value = ref<string>(props.title as string)

watchEffect(() => {
  value.value = props.title
})

const title = computed({
  get() {
    return props.title;
  },
  set(value) {
    value.value = value
  }
})

const handleReset = () => {
  isEditing.value = false;
  value.value = props.title;
}

const handleAction = () => {
  const prevTitle = props.title;
  const currentValue = value.value;
  if(prevTitle === currentValue || !currentValue) {
    value.value = prevTitle;
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
