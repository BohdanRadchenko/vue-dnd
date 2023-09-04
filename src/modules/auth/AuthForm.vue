<script setup lang='ts'>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { IAuthLoginProps } from '@/interfaces'
import Typography from '@/components/Typography.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'

interface IAuthFormProps {
  title: string;
  onSubmit: (data: IAuthLoginProps) => void;
  navTitle: string;
  navLink: string;
}

const props = defineProps<IAuthFormProps>()

const username = ref<string>("")
const password = ref<string>("")

const handleSubmit = () => {
  props.onSubmit({
    username: username.value,
    password: password.value
  })
}
</script>

<template>
  <div class='container'>
    <Typography :text='props.title' variant="title"/>
    <form @submit.prevent='handleSubmit'>
      <Input
        v-model='username'
        name='login'
        placeholder='Enter username...'
      />
      <Input
        v-model='password'
        type='password'
        name='password'
        placeholder='Enter password...'
      />
      <Button class='btn' type="submit" :shape='"sq"'>{{ props.title }}</Button>
    </form>
    <RouterLink :to='props.navLink' replace> {{ props.navTitle }} </RouterLink>
  </div>
</template>


<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 540px;
}

.btn {
  align-self: center;
}
</style>

