<script setup lang='ts'>
import { computed, ref } from 'vue'
import Input from '@/components/Input.vue'
import PlusIcon from '@/assets/icons/PlusIcon.vue'
import XMarkIcon from '@/assets/icons/XMarkIcon.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import CheckIcon from '@/assets/icons/CheckIcon.vue'

const isCreating = ref(false)
const title = ref<string>("")

const emit = defineEmits<{
  (e: 'submit', value: string): void
}>()

const onCloseForm = () => {
  title.value = "";
  isCreating.value = false;
}

const onSubmit = () => {
  emit('submit', title.value)
  onCloseForm();
}

const ButtonInnerIcon = computed(() => !isCreating.value ? PlusIcon : XMarkIcon)

</script>

<template>
  <form
    class="form"
    @keydown.esc="onCloseForm"
    @submit.prevent="onSubmit"
    v-if='isCreating'
  >
    <Input
      @blur='onCloseForm'
      v-model="title"
      placeholder="Enter list title..."
    />
    <ButtonIcon type='submit'><CheckIcon/></ButtonIcon>
  </form>
  <ButtonIcon
    @click.prevent="isCreating = !isCreating"
    type="button"
    class='btn'
  >
    <ButtonInnerIcon/>
  </ButtonIcon>
</template>

<style scoped>
.form {
  display: flex;
  align-items: center;
  position: relative;
}

.form input {
  padding-right: 36px;
}

.form button[type='submit'] {
  position: absolute;
  top: 0;
  right: 4px;
  transform: translateY(10%);
}
</style>
