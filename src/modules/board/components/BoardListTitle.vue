<script setup lang='ts'>
import { computed, ref } from 'vue'
import CheckIcon from '@/assets/icons/CheckIcon.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import TypographyInput from '@/components/TypographyInput.vue'

const props = defineProps(["modelValue"])

const isCreating = ref(false)
const title = ref<string>("")

const onCloseForm = () => {
  title.value = props.modelValue;
  isCreating.value = false;
}

const onSubmit = () => {
  console.log('title.value', title.value);
}

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    title.value = value;
  },
})


</script>

<template>
  <TypographyInput
    v-model='modelValue'
    @keydown.esc="onCloseForm"
    :onBlur='onCloseForm'
    :placeholder='title'
    typography='title'
    variant='text'
  />
  <ButtonIcon
    v-if='isCreating'
    @click.prevent="onSubmit"
  >
    <CheckIcon/>
  </ButtonIcon>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 0;
}

.form__input {
  padding: 8px 8px 4px 12px;
  border-radius: 8px;
  background-color: var(--card-background-color);
  border: 1px solid var(--ds-shadow-raised-1);
  box-shadow: var(--card-box-shadow);
  resize: none;
  max-height: 140px;
}

.form__input:focus {
  outline: 1px solid var(--dynamic-text-transparent);
}

.form__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.btn {
  outline: none;
  border-color: transparent;
  width: 100%;
  background-color: transparent;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  cursor: pointer;
}


</style>
