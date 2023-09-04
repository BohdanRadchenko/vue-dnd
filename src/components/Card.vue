<template>
  <div class='card'>
    <slot/>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--column-background-color);
  border-radius: 12px;
  padding: 8px;
  width: 100%;
  height: auto;
}
</style>
