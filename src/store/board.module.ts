import type {
  IBoard,
  IBoardState,
  IBordListCreateProps,
  IList,
  IBordListDeleteProps
} from '@/interfaces'
import api from '@/api'
import router from '@/router'
import { BOARDS_ROUTE_NAME } from '@/router/routes'

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
  },
  LIST_ADD (state: IBoardState, list: IList) {
    state.board?.lists.push(list);
    return state;
  },
  LIST_DELETE (state: IBoardState, listId: IList['id']) {
    const prevState = state.board ?? {} as IBoard;
    state.board = {
      ...prevState,
      lists: [...prevState.lists].filter(({_id}) => _id !== listId)
    }
    return state;
  },
  LIST_UPDATE (state: IBoardState, data: IList) {
    const prevState = state.board ?? {} as IBoard;

    state.board = {
      ...prevState,
      lists: [...prevState.lists]
        .map((list) => {
        if(list._id !== data._id) return list;
        return  { ...list, ...data }
      })
        .sort((a, b) => a.pos - b.pos)
    }
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
      console.error('BOARD_GET_ACTION', ex.message);
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
    api.board.onDisconnected(() => {
      console.log('disconnected');
      api.board.disconnect();
      router.push({ name: BOARDS_ROUTE_NAME })
    })
    api.board.onBoardUpdated((board) => {
      console.log('updated board => board', board);
      commit('SET_BOARD', board);
    })
    api.board.onListCreated((list) => {
      console.log('crated list => data', list);
      commit("LIST_ADD", list);
    })
    api.board.onListDeleted((data: IBordListDeleteProps) => {
      console.log('deleted list => _id:', data);
      commit("LIST_DELETE", data.listId);
    })
    api.board.onListDeleted((data: IBordListDeleteProps) => {
      console.log('deleted list => _id:', data);
      commit("LIST_DELETE", data.listId);
    })
    api.board.onListUpdated((data: any) => {
      console.log('updated list => data:', data);
      commit("LIST_UPDATE", data);
    })
  },
  DISCONNECT () {
    api.board.disconnect();
  },
  UPDATE ({commit}, data: IBoard) {
    try {
      api.board.emitBoardUpdate(data)
      commit('SET_BOARD', data)
    } catch (ex) {
      console.error('UPDATE_ACTION', ex);
    }
  },
  LIST_CREATE ({ commit }, data: IBordListCreateProps) {
    try {
      api.board.emitListCreate(data)
    } catch (ex) {
      console.error('LIST_CREATE', ex.message);
    }
  },
  LIST_DELETE ({ commit }, data: IBordListDeleteProps) {
    try {
      api.board.emitListDelete(data)
      commit("LIST_DELETE", data.listId);
    } catch (ex) {
      console.error('LIST_DELETE', ex.message);
    }
  },
  LIST_UPDATE ({ commit }, data: IList) {
    try {
      api.board.emitListUpdate(data)
      commit("LIST_UPDATE", data);
    } catch (ex) {
      console.error('LIST_UPDATE', ex.message);
    }
  },
}

const getters = {
  isLoading: ({ isLoading }: IBoardState): boolean => isLoading,
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
