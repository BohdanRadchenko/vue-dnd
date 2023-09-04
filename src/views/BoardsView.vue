<script setup lang='ts' >
import { computed, onBeforeMount } from 'vue'
import {useStore} from 'vuex';
import BoardsModule from '@/modules/boards/BoardsModule.vue'
import Loader from '@/components/Loader.vue'

const store = useStore();

const isLoading = computed(() => store.getters['boards/isLoading'])

onBeforeMount(() => {
  store.dispatch("boards/GET");
})

</script>

<template>
  <Loader :loading='isLoading'/>
  <BoardsModule/>
</template>
