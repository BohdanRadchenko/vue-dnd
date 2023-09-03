<script lang='ts' setup>
interface ILoaderProps {
  loading: boolean
}

const props = withDefaults(defineProps<ILoaderProps>(), {
  loading: false,
});


</script>

<template>
 <div v-if='props.loading'>
   Loading....
 </div>
</template>

<style scoped>

</style>
