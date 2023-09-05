<script setup lang='ts'>
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Input from '@/components/Input.vue'
import PlusIcon from '@/assets/icons/PlusIcon.vue'
import XMarkIcon from '@/assets/icons/XMarkIcon.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import CheckIcon from '@/assets/icons/CheckIcon.vue'

const isCreating = ref(false)
const title = ref<string>("")
const containerRef = ref()

const emit = defineEmits<{ (e: 'submit', value: string): void }>()

const onCloseForm = () => {
  title.value = "";
  isCreating.value = false;
}

const onSubmit = () => {
  emit('submit', title.value)
  onCloseForm();
}

onClickOutside(containerRef, onCloseForm)

const ButtonInnerIcon = computed(() => !isCreating.value ? PlusIcon : XMarkIcon)
</script>

<template>
  <div ref='containerRef' class='container'>
  <form
    class="form"
    @keydown.esc="onCloseForm"
    @submit.prevent="onSubmit"
    v-if='isCreating'
  >
    <Input
      v-model="title"
      placeholder="Enter list title..."
    />
    <ButtonIcon type='submit'>
      <CheckIcon/>
    </ButtonIcon>
  </form>
  <ButtonIcon @click.prevent="isCreating = !isCreating">
    <ButtonInnerIcon/>
  </ButtonIcon>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}
.form {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 20px;
}

.form input {
  padding: 9px 12px;
}

.form button[type='submit'] {

}
</style>
