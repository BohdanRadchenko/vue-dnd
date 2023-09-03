<script  lang='ts' setup=''>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
   <input
     type='text'
     class='input'
     v-model="value"
   >
</template>

<style scoped>
.input {
  width: 100%;
  border-radius: 3rem;
  padding: 12px 16px;
  outline: none;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px var(--vt-c-text-dark-3);
}

.input:focus {
  outline: 1px solid var(--vt-c-divider-dark-2);
}

.input:hover {
  outline: 1px solid var(--vt-c-divider-dark-1);
}

</style>
