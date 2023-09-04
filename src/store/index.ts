import type { InjectionKey } from 'vue'
import { createStore, createLogger, Store, useStore as baseUseStore } from 'vuex'
import type {
  IStoreState,
} from '@/interfaces'
import authModule from '@/store/auth.module'
import boardsModule from '@/store/boards.module'
import boardModule from '@/store/board.module'

const debug = import.meta.env.NODE_ENV !== 'production'

export const key: InjectionKey<Store<IStoreState>> = Symbol.for('store-app')

export const store =  createStore<IStoreState>({
  plugins: debug ? [createLogger()] : [],
  strict: debug,
  modules: {
    auth: authModule,
    boards: boardsModule,
    board: boardModule
  }
})

export function useStore () {
  return baseUseStore(key)
}
