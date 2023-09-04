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
  padding: 12px 16px;
  outline: none;
  border-radius: .25rem;
  border: 1px solid var(--ds-shadow-raised-1);
  box-shadow: var(--ds-shadow-raised-1);
}

.input:focus {
  outline: 1px solid var(--dynamic-text-transparent);
}
</style>
