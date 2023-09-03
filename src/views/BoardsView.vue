<script setup lang='ts' >
import {
  computed,
  onBeforeMount,
  ref
} from 'vue'
import {useStore} from 'vuex';
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue';
import { BOARDS_PAGE_ROUTE_NAME } from '@/router/routes'
import BoardsCard from '@/components/BoardsCard.vue'
import Input from '@/components/Input.vue'
import { IBoard } from '@/interfaces'

const store = useStore();
const router = useRouter();

const ownerBoards = computed(() => store.getters['boards/getOwnerBoards'])
const accessedBoards = computed(() => store.getters['boards/getAccessedBoards'])

const title = ref<string>('')

onBeforeMount(() => {
  store.dispatch("boards/GET");
})

const redirectToBoardById = (boardId: IBoard['_id']) => {
  return router.push({ name: BOARDS_PAGE_ROUTE_NAME, params: { boardId, } })
}

const handleCreate = () => {
  //TODO: is it ok? actions await ? best practice? window.location in actions method? how get router instance in store without props ?
  store.dispatch(
    "boards/CREATE",
    { title: title.value || "New board" }
  ).then(board => {
    redirectToBoardById(board._id)
  }).finally(() => {
    title.value = ""
  })
}

</script>

<template>
  <div class='container'>
    <form @submit.prevent='handleCreate' class='form' >
      <Input v-model='title'/>
      <Button type="submit">+</Button>
    </form>
    <div class='wrapper' v-if='ownerBoards.length'>
      <BoardsCard
        v-for='board in ownerBoards'
        :key='board._id'
        :board='board'
      />
    </div>
    <br/>
    <div class='wrapper' v-if='accessedBoards.length'>
      <BoardsCard
        v-for='board in accessedBoards'
        :key='board._id'
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
  max-height: 100%;
  overflow: auto;
}

.form {
  max-width: 300px;
  display: flex;
  gap: 16px;
}

.wrapper {
  padding: 20px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

</style>
