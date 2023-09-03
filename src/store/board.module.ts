import type {
  IBoard,
  IBoardState,
  IStoreState,
} from '@/interfaces'
import api from '@/api'

const state: IBoardState = {
  board: {} as IBoard,
  isLoading: false,
}

const mutations = {
  SET_LOADING_TRUE(state: IStoreState) {
    state.board = {
      ...state.board,
      isLoading: true
    }
  },
  SET_LOADING_FALSE(state: IStoreState) {
    state.board = {
      ...state.board,
      isLoading: false
    }
  },
  SET_BOARD (state: IStoreState, {board}: {board: IBoard}) {
    const prevStateBoard = state.board.board ?? {};
    state.board.board = {...prevStateBoard, ...board};
  }
}

const actions = {
  async GET ({ commit }, boardId: IBoard['id']) {
    commit("SET_LOADING_TRUE")
    try {
      const board = await api.boards.getById(boardId);
      commit({
        type: 'SET_BOARD',
        board,
      });
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
    api.board.instance.on("updated", (data) => {
      console.log('updated => data', data);
      commit('SET_BOARD', {board: data});
    })
  },
  UPDATE ({commit}, data: IBoard) {
    try {
      api.board.update(data)
    } catch (ex) {
      console.log('ex', ex);
    }
  },
  DISCONNECT () {
    api.board.disconnect();
  },
}

const getters = {
  isLoading: (state: IStoreState): boolean => state.board.isLoading,
  getBoard: (state: IStoreState): IBoard | null => state.board.board,
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
