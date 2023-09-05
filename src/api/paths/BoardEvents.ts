export class BoardsEvent {

  public get onBoardUpdated() {
    return 'BOARD_UPDATED'
  }

  public get emitBoardUpdate() {
    return 'BOARD_UPDATE'
  }

  public get onListCreated() {
    return 'LIST_CREATED'
  }

  public get emitListCreate() {
    return 'LIST_CREATE'
  }

  public get onListDeleted() {
    return 'LIST_DELETED'
  }

  public get emitListDeleted() {
    return 'LIST_DELETE'
  }

  public get onListUpdated() {
    return 'LIST_UPDATED'
  }

  public get emitListUpdate() {
    return 'LIST_UPDATE'
  }

  public get onListReordered() {
    return 'LIST_REORDERED'
  }

  public get emitListReorder() {
    return 'LIST_REORDER'
  }

}
