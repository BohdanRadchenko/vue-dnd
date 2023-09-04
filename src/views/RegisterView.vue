<script setup lang='ts'>
import { computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { IAuthLoginProps } from '@/interfaces'
import { HOME_ROUTE, LOGIN_ROUTE } from '@/router/routes'
import AuthForm from '@/modules/auth/AuthForm.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const isAuth = computed(() => store.getters['auth/isAuth'])

watchEffect(() => {
  if ( !isAuth.value ) return
  const redirectPath = route.redirectedFrom?.fullPath || { path: HOME_ROUTE }
  router.push(redirectPath)
})

const onSubmit = (data: IAuthLoginProps) => {
  store.dispatch('auth/REGISTER', data)
}

</script>

<template>
  <AuthForm
    title='Register'
    navTitle='Registration'
    :navLink='LOGIN_ROUTE'
    :onSubmit='onSubmit'
  />
</template>
