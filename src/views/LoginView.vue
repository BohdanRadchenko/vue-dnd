<script setup lang='ts' >
import { computed, watchEffect } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { IAuthLoginProps } from '@/interfaces'
import { HOME_ROUTE, REGISTER_ROUTE } from '@/router/routes'
import AuthForm from '@/modules/auth/AuthForm.vue'

const store = useStore();
const router = useRouter();
const route = useRoute();

const isAuth = computed(() => store.state.auth.isAuth)

watchEffect(() => {
  if(!isAuth.value) return;
  const redirectPath = route.redirectedFrom?.fullPath || {path: HOME_ROUTE}
  router.push(redirectPath);
})

const onSubmit = (data: IAuthLoginProps) => {
  store.dispatch('auth/LOGIN',  data);
}

</script>

<template>
  <AuthForm
    title='Login'
    navTitle='Registration'
    :navLink='REGISTER_ROUTE'
    :onSubmit='onSubmit'
  />
</template>
