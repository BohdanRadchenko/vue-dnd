<script setup lang='ts' >
import { computed, onMounted } from 'vue'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
import Button from '@/components/Button.vue';
import { BOARDS_PAGE_ROUTE_NAME } from '@/router/routes'
import BoardsCard from '@/components/BoardsCard.vue'

const store = useStore();
const router = useRouter();

const boards = computed(() => store.getters.boards)

onMounted(() => {
  store.dispatch("get");
})

const handleCreate = async () => {
  //TODO: is it ok? actions await ? best practice? window.location in actions method?
  const board = await store.dispatch("create", "test title");
  return router.push({ name: BOARDS_PAGE_ROUTE_NAME, params: { boardId: board.id } })
}

</script>

<template>
  <div class='container'>
    <Button @click='handleCreate'>+</Button>
    <div class='wrapper'>
      <BoardsCard
        v-for='board in boards'
        :key='board.id'
        :board='board'
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.wrapper {
  padding: 20px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

</style>
