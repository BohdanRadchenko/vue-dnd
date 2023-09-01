import { createStore, createLogger } from 'vuex'
import type {
  IStoreState,
} from '@/interfaces'
import boardModule from '@/store/board.module'
import authModule from '@/store/auth.module'

const debug = import.meta.env.NODE_ENV !== 'production'

// export const key: InjectionKey<Store<State>> = Symbol()

export const store =  createStore<IStoreState>({
  plugins: debug ? [createLogger()] : [],
  modules: {
    board: boardModule,
    auth: authModule
  }
})
