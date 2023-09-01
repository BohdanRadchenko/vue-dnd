<script setup lang='ts' >
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { LOGIN_ROUTE } from '@/router/routes'

const store = useStore();
const router = useRouter();

const isAuth = computed(() => store.getters.isAuth)


const logout = () => {
  store.dispatch('logout')
    .then(() => router.push(LOGIN_ROUTE))
}

</script>

<template>
    <header>
      <button
        @click='logout'
        v-if='!!isAuth'
      >
        Logout
      </button>
    </header>
</template>

<style scoped>
header {
  padding: 0 20px;
  background-color: var(--color-background-header);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-height: 48px;
}
</style>
