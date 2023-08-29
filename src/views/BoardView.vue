<script setup lang='ts' >
import { onMounted, computed, ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useStore} from 'vuex';
import { IBoard, ICardAddProps, ICardRemoveProps } from '@/interfaces'
import { BOARDS_ROUTE_NAME } from '@/router/routes'
import DraggableList from '@/components/DraggableList.vue'
import Button from '@/components/Button.vue'
import Typography from '@/components/Typography.vue'
import { useWindowBeforeUnload } from '@/hooks'

const store = useStore();
const router = useRouter();
const route = useRoute()
const isLoading = ref(false);

const boardId: IBoard['id'] = Number(route.params.boardId);

const redirectToBoards = () => {
  router.push({name: BOARDS_ROUTE_NAME})
};

const board = computed(() => store.getters.boardById(boardId))

const isShowContent = computed(() => !!board.value && !isLoading.value)

const handleBack = () => {
  router.go(-1)
}

const handleRemoveBoard = () => {
  const conf = confirm("Are you sure?");
  if(!conf) return;
  store.dispatch("remove", boardId)
  redirectToBoards();
}

onMounted(  async () => {
  isLoading.value = true;
  if(!Number(boardId)) return redirectToBoards();
  const result = await store.dispatch("getById", boardId)
  isLoading.value = false;
  if(!result) redirectToBoards(); //TODO: mb another lifecycle ?
})

onUnmounted(() => {
  store.dispatch("save", boardId)
})

useWindowBeforeUnload(() => {
  store.dispatch("save", boardId);
})

</script>

<template>
  <div class='board__actions' v-if='isShowContent'>
    <Button @click='handleBack'>&lt;</Button>
    <Typography :text='board.title' :variant='"title"' uppercase/>
    <Button @click='handleRemoveBoard'>x</Button>
  </div>
  <div class='board__container' v-if='isShowContent'>
    <DraggableList
      v-for="item in board.items"
      :key="item.id"
      :groupId='board.id'
      :list='item'
    />
    <div class='board__container__buttons'>
      <Button @click='store.commit("createBoardList", boardId)'>+</Button>
    </div>
  </div>
</template>

<style scoped>
.board__actions {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.board__container {
  height: 100%;
  flex-grow: 1;
  padding: 10px;
  align-items: start;
  display: grid;
  grid-auto-columns: 300px;
  grid-auto-flow: column;
  grid-column-gap: 20px;
  overflow: auto hidden;
}

.board__container__buttons {
  padding-top: 4px;
}
</style>
