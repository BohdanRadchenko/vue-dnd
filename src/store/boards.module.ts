import type {
  IBoard,
  ICard,
  ICardAddProps,
  ICardRemoveProps,
  IList,
  IListRemoveProps,
  IListRenameProps,
  IBoardsState,
  IBoardCreateProps,
  IStoreState,
} from '@/interfaces'
import api from '@/api'

const state: IBoardsState = {
  boards: [] as IBoard[],
  currentBoard: null,
  isLoading: false,
}

const mutations = {
  SET_LOADING_TRUE(state: IStoreState) {
    state.boards = {
      ...state.boards,
      isLoading: true
    }
  },
  SET_LOADING_FALSE(state: IStoreState) {
    state.boards = {
      ...state.boards,
      isLoading: false
    }
  },
  SET_CURRENT_BOARD (state: IStoreState, {board}: {board: IBoard}) {
    state.boards = {
      ...state.boards,
      currentBoard: board,
    };
  },
  LOAD_BOARDS (state: IStoreState, {boards}: {boards: IBoard[]}) {
    state.boards = {
      ...state.boards,
      boards
    }
  },
  DELETE_BOARD(state: IStoreState, { boardId }: {boardId: IBoard['id']}) {
    state.boards.boards = state.boards.boards.filter(({id}) => boardId !== id);
  },
  // createBoardList(state: IBoardState, boardId: IBoard['id']) {
  //   const length = state.boardsMap.get(boardId)?.items?.length + 1;
  //   state.boardsMap.get(boardId)?.items.push({
  //     id: Date.now(),
  //     title: `List ${length}`,
  //     items: [],
  //   })
  // },
  // removeBoardList (state: IBoardState, payload: IListRemoveProps) {
  //   const {boardId, listId} = payload;
  //   const items:IList[] | undefined = state.boardsMap.get(boardId)?.items;
  //
  //   if(!items) return;
  //   state
  //     .boardsMap.get(boardId)
  //     .items = items.filter(({id}) => id !== listId);
  // },
  // renameBoardList (state: IBoardState, payload: IListRenameProps) {
  //   const {boardId, listId, title} = payload;
  //   const items = state.boardsMap.get(boardId)?.items;
  //
  //   if(!items) return;
  //
  //   state
  //     .boardsMap.get(boardId)
  //     .items = items.map((item => {
  //     if(item.id !== listId) return item;
  //     return  { ...item, title }
  //   }));
  // },
  // createBoardCard (state: IBoardState, payload: ICardAddProps) {
  //   const {boardId, listId, card, index} = payload;
  //
  //   if(!!card && !card?.id) {
  //     card.id = Date.now()
  //   }
  //
  //   state
  //     .boardsMap
  //     .get(boardId)?.items
  //     .find(({id}) => id === listId)?.items
  //     .splice(index, 0, card as ICard);
  // },
  // removeBoardCard (state: IBoardState, payload: ICardRemoveProps) {
  //   const {boardId, listId, cardId} = payload;
  //   const items = state.boardsMap.get(boardId)?.items
  //
  //   if(!items) return;
  //   state
  //     .boardsMap
  //     .get(boardId).items = items.map(list => {
  //     if(list.id !== listId) return list;
  //     return {
  //       ...list,
  //       items: list.items.filter(({id}) => id !== cardId),
  //     }
  //   })
  // }
}

const actions = {
  async GET({ commit }) {
    commit("SET_LOADING_TRUE")
    try {
      const boards = await api.boards.get;
      commit({
        type: 'LOAD_BOARDS',
        boards,
      });
      return Promise.resolve(boards);
    } catch (ex) {
      console.error('BOARDS_GET_ACTION', ex.message);
      return Promise.reject(ex);
    } finally {
      commit("SET_LOADING_FALSE")
    }
  },
  async CREATE({commit}, data: IBoardCreateProps) {
    try {
      commit("SET_LOADING_TRUE")
      const board = await api.boards.create(data);
      commit({
        type: 'SET_BOARD',
        board,
      });
      commit("SET_LOADING_FALSE")
      return Promise.resolve(board);
    } catch (ex) {
      commit("SET_LOADING_FALSE")
      console.error('BOARD_CREATE_ACTION', ex.message);
      return Promise.reject(ex);
    }
  },
  async DELETE({commit}, boardId: IBoard['id']) {
    try {
      commit("SET_LOADING_TRUE")
      await api.boards.deleteById(boardId);
      commit({
        type: 'DELETE_BOARD',
        boardId,
      });
      return Promise.resolve();
    } catch (ex) {
      console.error('BOARD_DELETE_ACTION', ex.message);
      return Promise.reject(ex);
    } finally {
      commit("SET_LOADING_FALSE")
    }
  },
  async UPDATE({commit}, {_id, ...rest}: IBoard) {
    try {
      commit("SET_LOADING_TRUE")
      const board = await api.boards.updateById(_id, rest);
      commit({ type: 'SET_BOARD', board });
      commit({ type: 'SET_CURRENT_BOARD', board });
      return Promise.resolve(board);
    } catch (ex) {
      console.error('BOARD_UPDATE_ACTION', ex.message);
      return Promise.reject(ex);
    } finally {
      commit("SET_LOADING_FALSE")
    }
  },
}

const getters = {
  isLoading: (state: IStoreState): boolean => !!state.boards.isLoading,
  getOwnerBoards: (state: IStoreState): IBoard[] => {
    const boards = state.boards.boards;
    if(!boards) return [];
    return boards.filter(({isOwner}) => !!isOwner)
  },
  getAccessedBoards: (state: IStoreState): IBoard[] => {
    const boards = state.boards.boards;
    if(!boards) return [];
    return boards.filter(({isOwner}) => !isOwner)
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
