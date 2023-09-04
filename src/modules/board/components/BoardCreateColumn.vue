<script setup lang='ts'>
import { ref } from 'vue'
import Card from '@/components/Card.vue'
import Input from '@/components/Input.vue'
import PlusIcon from '@/assets/icons/Plus.vue'
import XMarkIcon from '@/assets/icons/XMark.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import Button from '@/components/Button.vue'


const isCreating = ref(false)
const title = ref<string>("")

const onCloseForm = () => {
  title.value = "";
  isCreating.value = false;
}

const onSubmit = () => {
  title.value = "";
}

</script>

<template>
  <Card v-if="isCreating">
  <form
    class='form'
    @keydown.esc="onCloseForm"
    @submit.prevent="onSubmit"
  >
    <Input
      v-model="title"
      placeholder="Enter list title..."
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
  </Card>
  <button
    v-if="!isCreating"
    @click.prevent="isCreating = true"
    type="button"
    class='btn'
  >
    <PlusIcon/>
    <span>Add another list</span>
  </button>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.btn {
  outline: none;
  border-color: transparent;
  border-radius: 12px;
  width: 100%;
  height: 48px;
  background-color: #00000014;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  cursor: pointer;
}


</style>
