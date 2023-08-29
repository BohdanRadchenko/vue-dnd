<script setup lang='ts'>
import Typography from '@/components/Typography.vue'

type ButtonSize = "normal" | "sm"

export interface IButtonProps {
  size?: ButtonSize;
}

const props = withDefaults(defineProps<IButtonProps>(), {
  size: "normal"
});
</script>

<template>
  <button class='btn' :class='[props.size]'>
    <Typography :variant='"subtitle"'>
      <slot/>
    </Typography>
  </button>
</template>

<style scoped>
.btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 1;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  padding: 0;
  border-radius: 50%;
  border: 1px solid var(--vt-c-text-dark-3);
  background-color: var(--vt-c-text-dark-1);
  box-shadow: 0 4px var(--vt-c-text-dark-2);
}

.btn:hover {
  box-shadow: 0 2px var(--vt-c-text-dark-2);
  top: 2px;
}

.btn:active {
  box-shadow: 0 0 var(--vt-c-text-dark-2);
  top: 2px;
}

.btn.normal {
  min-width: 40px;
  min-height: 40px;
  width: 40px;
  height: 40px;
}

.btn.sm {
  min-width: 24px;
  min-height: 24px;
  width: 24px;
  height: 24px;
  box-shadow: 0 2px var(--vt-c-text-dark-2);
}

.btn.sm:hover {
  box-shadow: 0 1px var(--vt-c-text-dark-2);
  top: 1px
}

.btn.sm:active {
  box-shadow: 0 0 var(--vt-c-text-dark-2);
  top: 0;
}

</style>
