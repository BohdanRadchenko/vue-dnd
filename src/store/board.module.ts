import type {
  IBoard,
  IBoardState,
} from '@/interfaces'
import api from '@/api'
import { debounce } from 'lodash'

const state: IBoardState = {
  board: null,
  isLoading: false,
}

const mutations = {
  SET_LOADING_TRUE(state: IBoardState) {
    state.isLoading = true;
    return state;
  },
  SET_LOADING_FALSE(state: IBoardState) {
    state.isLoading = false;
    return state;
  },
  SET_BOARD (state: IBoardState, board: IBoard) {
    const prevState = state.board ?? {};
    state.board = {...prevState, ...board};
    return state;
  }
}

const actions = {
  async GET ({ commit }, boardId: IBoard['id']) {
    commit("SET_LOADING_TRUE")
    try {
      const board = await api.boards.getById(boardId);
      commit('SET_BOARD', board);
      return Promise.resolve(board);
    } catch (ex) {
      console.error('BOARDS_GET_ACTION', ex.message);
      return Promise.reject(ex);
    } finally {
      commit("SET_LOADING_FALSE")
    }
  },
  CONNECT ({commit}, boardId: IBoard['id']) {
    api.board.connect(boardId);
    api.board.onConnected((connected) => {
      console.log('connected', connected);
    })
    api.board.onDisconnected((disconnected) => {
      console.log('disconnected', disconnected);
    })
    api.board.onUpdatedBoard((board) => {
      console.log('updated board => board', board);
      commit('SET_BOARD', board);
    })
    api.board.onCreatedList((list) => {
      console.log('crated list => data', list);
    })
  },
  DISCONNECT () {
    api.board.disconnect();
  },
  UPDATE ({commit}, data: IBoard) {
    try {
      api.board.emitUpdateBoard(data)
      commit('SET_BOARD', data)
    } catch (ex) {
      console.log('ex', ex);
    }
  },
  CREATE_LIST ({commit, state }, title: string) {
    console.log('CREATE_LIST => state', state);
    // const lists = state.board.board.lists
    // console.log('lists', lists);
    // const position = lists.length * 1000 + 1000;
    // console.log('position', position);
    // console.log('position', position);
    // api.board.emitCreateList({title, position: state.board.board.lists.length * 1000 + 1000})
  },
}

const getters = {
  isLoading: ({ isLoading }: IBoardState): boolean => isLoading,
  getBoard: ({ board }: IBoardState): IBoard | null => board,
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
