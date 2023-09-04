<script setup lang='ts' >
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { LOGIN_ROUTE } from '@/router/routes'
import Typography from '@/components/Typography.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import LogoutIcon from '@/assets/icons/LogoutIcon.vue'

const store = useStore();
const router = useRouter();

const isAuth = computed(() => store.getters['auth/isAuth'])
const user = computed(() => store.getters['auth/me'])

const isShowContent = !!isAuth.value && !!user.value

const logout = () => {
  store.dispatch('auth/LOGOUT')
    .then(() => router.push(LOGIN_ROUTE))
}

</script>

<template>
    <header class='header__container'>
      <div class="header__content" v-if='isShowContent'>
        <Typography :text='user.username'/>
      </div>
      <div class="header__actions" v-if='isShowContent'>
        <ButtonIcon @click='logout'>
          <LogoutIcon/>
        </ButtonIcon>
      </div>
    </header>
</template>

<style scoped>
.header__container {
  min-height: 48px;
  max-height: 48px;
  overflow: hidden;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--header-background-color);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--header-border-color);
  backdrop-filter: blur(6px);
}

</style>
