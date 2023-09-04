<script setup lang='ts' >

</script>

<template>
  <button class='button-base'>
    <slot/>
  </button>
</template>

<style scoped>
.button-base {
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 1;
  outline: none;
  border: none;
  position: relative;
  padding: 2px 6px;
  background: transparent;
  min-height: 32px;
  transition: all 250ms;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  border-radius: .25rem;
}


.button-base:hover,
.button-base:focus {
  border-color: var(--dynamic-text-transparent);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button-base:hover {
  transform: translateY(-1px);
}

.button-base:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}

</style>
