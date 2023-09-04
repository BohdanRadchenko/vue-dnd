<script setup lang='ts' >
import { computed, onBeforeMount } from 'vue'
import {useStore} from '@/store';
import BoardsModule from '@/modules/boards/BoardsModule.vue'
import Loader from '@/components/Loader.vue'

const store = useStore();

const isLoading = computed(() => store.state.boards.isLoading)

onBeforeMount(() => {
  store.dispatch("boards/GET");
})

</script>

<template>
  <Loader :loading='isLoading'/>
  <BoardsModule/>
</template>
