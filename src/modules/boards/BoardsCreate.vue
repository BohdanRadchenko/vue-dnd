<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { BOARDS_PAGE_ROUTE_NAME } from '@/router/routes';
import Card from '@/components/Card.vue'
import Input from '@/components/Input.vue'
import ButtonIcon from '@/components/ButtonIcon.vue';
import PlusIcon from "@/assets/icons/PlusIcon.vue";

const store = useStore();
const router = useRouter();

const title = ref<string>('')

const handleCreate = () => {
  //TODO: is it ok? actions await ? best practice? window.location in actions method? how get router instance in store without props ?
  store.dispatch(
    "boards/CREATE",
    { title: title.value || "New board" }
  ).then(board => {
    router.push({ name: BOARDS_PAGE_ROUTE_NAME, params: { boardId: board.id } })
  }).finally(() => {
    title.value = ""
  })
}
</script>

<template>
 <div class='form__container'>
   <form @submit.prevent='handleCreate' class='form' >
     <Card class='form__wrapper'>
       <Input
         v-model='title'
         class='form__input'
         placeholder='Enter board title...'
       />
       <ButtonIcon type="submit"><PlusIcon/></ButtonIcon>
     </Card>
   </form>
 </div>
</template>

<style scoped>
.form__container {
  display: flex;
  flex-direction: row-reverse;
}

.form {
  padding: 6px 0;
  display: inline-flex;
  flex-direction: row-reverse;
  align-items: center;
}

.form__wrapper {
  width: auto;
  transition: all .2s ease;
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.form__input {
  width: 138px;
  min-width: 138px;
  max-width: 400px;
  transition: all .2s ease;
}

.form__input:hover,
.form__input:focus {
  width: auto;
  min-width: 300px;
}

.form__wrapper button {
  border: 1px solid var(--ds-shadow-raised-1);
  box-shadow: var(--ds-shadow-raised-1);
  background-color: #fff;
}

</style>
