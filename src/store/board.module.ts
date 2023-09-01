import type {
  IBoard,
  ICard,
  ICardAddProps,
  ICardRemoveProps,
  IList,
  IListRemoveProps,
  IListRenameProps,
  IBoardState,
} from '@/interfaces'
import api from '@/api'

const state: IBoardState = {
  boardsMap: new Map<number, IBoard>([]),
}

const mutations = {
  setBoard (state: IBoardState, board: IBoard) {
    state.boardsMap.set(
      board.id,
      state.boardsMap.has(board.id)
        ? {...state.boardsMap.get(board.id), ...board}
        : board
    );
  },
  removeBoard(state: IBoardState, boardId: IBoard['id']) {
    state.boardsMap.delete(boardId);
  },
  createBoardList(state: IBoardState, boardId: IBoard['id']) {
    const length = state.boardsMap.get(boardId)?.items?.length + 1;
    state.boardsMap.get(boardId)?.items.push({
      id: Date.now(),
      title: `List ${length}`,
      items: [],
    })
  },
  removeBoardList (state: IBoardState, payload: IListRemoveProps) {
    const {boardId, listId} = payload;
    const items:IList[] | undefined = state.boardsMap.get(boardId)?.items;

    if(!items) return;
    state
      .boardsMap.get(boardId)
      .items = items.filter(({id}) => id !== listId);
  },
  renameBoardList (state: IBoardState, payload: IListRenameProps) {
    const {boardId, listId, title} = payload;
    const items = state.boardsMap.get(boardId)?.items;

    if(!items) return;

    state
      .boardsMap.get(boardId)
      .items = items.map((item => {
      if(item.id !== listId) return item;
      return  { ...item, title }
    }));
  },
  createBoardCard (state: IBoardState, payload: ICardAddProps) {
    const {boardId, listId, card, index} = payload;

    if(!!card && !card?.id) {
      card.id = Date.now()
    }

    state
      .boardsMap
      .get(boardId)?.items
      .find(({id}) => id === listId)?.items
      .splice(index, 0, card as ICard);
  },
  removeBoardCard (state: IBoardState, payload: ICardRemoveProps) {
    const {boardId, listId, cardId} = payload;
    const items = state.boardsMap.get(boardId)?.items

    if(!items) return;
    state
      .boardsMap
      .get(boardId).items = items.map(list => {
      if(list.id !== listId) return list;
      return {
        ...list,
        items: list.items.filter(({id}) => id !== cardId),
      }
    })
  }
}

const actions = {
  get ({ commit }) {
    const boards = api.boards.get;
    boards.forEach((board) => {
      commit('setBoard', board);
    })
  },
  getById ({ state, commit }, boardId: IBoard['id']) {
    if(state.boardsMap.has(boardId)) {
      return state.boardsMap.get(boardId)
    }
    const board = api.boards.getById(boardId);
    if(!board) return;
    commit('setBoard', board);
    return board;
  },
  create({commit}, title: IBoard['title']): IBoard {
    const board = api.boards.create(title)
    commit('setBoard', board);
    return board;
  },
  remove({commit}, boardId: IBoard['id']) {
    api.boards.remove(boardId);
    commit('removeBoard', boardId);
  },
  save({state}: {state: IBoardState}, boardId: IBoard['id']) {
    const board = state.boardsMap.get(boardId);
    if(!board) return;
    api.boards.save(board)
  }
}

const getters = {
  boards: (state: IBoardState): IBoard[] => Array.from(
    state.boardsMap,
    ([id, board]) => board
  ),
  boardById: (state: IBoardState) : (boardId: string) => IBoard | undefined =>
    boardId => state.boardsMap.get(Number(boardId)),
}


export default {
  state,
  mutations,
  actions,
  getters,
}