import { key, store } from '@/store'
import './styles/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app
  .use(store, key)
  .use(router)
  .mount('#app')
