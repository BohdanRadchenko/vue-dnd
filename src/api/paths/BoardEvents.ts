export class BoardsEvent {

  public get onUpdatedBoard() {
    return 'EMIT_UPDATED_BOARD'
  }

  public get emitUpdateBoard() {
    return 'EVENT_UPDATE_BOARD'
  }

  public get onCreatedList() {
    return 'EMIT_CREATED_LIST'
  }

  public get emitCreateList() {
    return 'EVENT_CREATE_LIST'
  }

}
