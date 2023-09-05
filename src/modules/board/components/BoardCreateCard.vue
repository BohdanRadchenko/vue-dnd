<script setup lang='ts'>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import PlusIcon from '@/assets/icons/PlusIcon.vue'
import XMarkIcon from '@/assets/icons/XMarkIcon.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import Button from '@/components/Button.vue'

const emit = defineEmits<{
  (e: 'create', value: string): void
}>()

const containerRef = ref();
const isCreating = ref(false)
const description = ref<string>("")

const onCloseForm = () => {
  description.value = "";
  isCreating.value = false;
}

const onSubmit = () => {
  if(!description.value.length) return;
  emit("create", description.value)
  onCloseForm();
}

onClickOutside(containerRef, onCloseForm)
</script>

<template>
  <div ref='containerRef'>
    <form
      class='form'
      v-if="isCreating"
      @keydown.esc="onCloseForm"
      @submit.prevent="onSubmit"
    >
      <textarea
        @keydown.esc="onCloseForm"
        v-model="description"
        class='form__input'
        rows="4"
        placeholder="Enter a title for this card..."
      />
      <div class='form__actions'>
        <Button
          text='Add list'
          type="submit"
          class='form__actions-submit'
        />
        <ButtonIcon @click.prevent="onCloseForm">
          <XMarkIcon/>
        </ButtonIcon>
      </div>
    </form>
    <button
      v-if="!isCreating"
      @click.prevent="isCreating = true"
      class='btn'
    >
      <PlusIcon/>
      <span>Add a card</span>
    </button>
  </div>
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
