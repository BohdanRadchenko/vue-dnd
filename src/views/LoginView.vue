<script setup lang='ts' >
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Typography from '@/components/Typography.vue'
import { IAuthLoginProps } from '@/interfaces'
import { HOME_ROUTE, REGISTER_ROUTE } from '@/router/routes'

const store = useStore();
const router = useRouter();
const route = useRoute();

const username = ref<string>("")
const password = ref<string>("")

const isAuth = computed(() => store.getters['auth/isAuth'])

watchEffect(() => {
  if(!isAuth.value) return;
  const redirectPath = route.redirectedFrom?.fullPath || {path: HOME_ROUTE}
  router.push(redirectPath);
})

const submit = () => {
  const data: IAuthLoginProps = {
    username: username.value,
    password: password.value
  };
  store.dispatch('auth/LOGIN',  data);
}

</script>

<template>
  <div class='container'>
    <Typography text='Login' variant="title"/>
    <form @submit.prevent='submit'>
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
      <Button type="submit" :shape='"sq"'>Login</Button>
    </form>
    <RouterLink :to='REGISTER_ROUTE' replace> registration </RouterLink>
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
</style>
