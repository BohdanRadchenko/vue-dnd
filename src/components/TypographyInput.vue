<script setup lang='ts' >
import { computed } from 'vue'

type TInputTypography = "title" | "body";
type TInputVariant = "outlined" | "text";

export interface ITypographyInputProps {
  modelValue: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: (value: string) => void;
  typography?: TInputTypography;
  variant?: TInputVariant,
  placeholder?: string;
}

const props = withDefaults(defineProps<ITypographyInputProps>(), {
  modelValue: "",
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  typography: "body",
  variant: "text",
  placeholder: "Enter text",
});

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
    class='typography-input__input'
    :class='[ props.typography, props.variant]'
    v-model="value"
    @change='onChange(this.modelValue)'
    @focus='onFocus(this.modelValue)'
    @blur='onBlur(this.modelValue)'
    :placeholder='props.placeholder'
  />
</template>

<style scoped>
.typography-input__input {
  outline: none;
  border: none;
  background-color: transparent;
  padding: 8px;

  width: 100%;
  line-height: 1.2;
  border-radius: 2em;
}

.typography-input__input:not(:focus) {
  cursor: pointer;
}

.typography-input__input.title {
  font-size: 20px;
  font-weight: 700;
}

.typography-input__input.body {
  font-size: 14px;
  font-weight: 400;
}

.typography-input__input.outlined {
  background-color: var(--color-background-card);
  outline: 1px solid var(--color-background-list);
  padding: 8px 12px;
}
</style>
