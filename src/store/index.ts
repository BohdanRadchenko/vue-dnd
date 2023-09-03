import { createStore, createLogger } from 'vuex'
import type {
  IStoreState,
} from '@/interfaces'
import authModule from '@/store/auth.module'
import boardsModule from '@/store/boards.module'
import boardModule from '@/store/board.module'

const debug = import.meta.env.NODE_ENV !== 'production'

// export const key: InjectionKey<Store<State>> = Symbol()

export const store =  createStore<IStoreState>({
  plugins: debug ? [createLogger()] : [],
  modules: {
    auth: authModule,
    boards: boardsModule,
    board: boardModule
  }
})
