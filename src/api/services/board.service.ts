import { AbstractService } from '@/api/services/abstract.service'
import { Socket } from 'socket.io-client'
import { SocketInstance } from '@/api/SocketInstance'
import type { OptionsType } from '@/api/SocketInstance'
import { AuthLocalService } from '@/api/services/auth-local.service'
import type { IBoard, IUser, IBordListCreateProps, IList, IBordListDeleteProps } from '@/interfaces'

type CallbackType<T> = (data: T) => void;

export class BoardService extends AbstractService{
  private readonly path: string = "/board";
  private readonly authLocalService: AuthLocalService<IUser> = new AuthLocalService();
  private socket: Socket;

  constructor(private readonly socketInstance: SocketInstance) {
    super()
  }

  public get instance(): Socket {
    if(!this.socket) {
      throw new Error("Socket is not defined!")
    }
    return this.socket;
  }

  public register<T>(ev: string, cb:CallbackType<T>) {
    console.log(`start listening event: ${this.path} '${ev}'`)
    this.instance.on(ev, cb);
  }

  public connect(boardId: IBoard['id']): Socket {
    const options: OptionsType = {
      auth: {
        token: this.authLocalService.getLocalAccessToken(),
      },
      query: {
        boardId
      }
    }
    if(!this.socket) {
      this.socket = this.socketInstance.of(this.path, options);
    } else {
      this.socket.connect();
    }

    this.socket.on("connect_error", () => {
      this.socket.io.opts.transports = ["polling", "websocket"];
    })
    return this.socket;
  }

  public disconnect(): Socket {
    if(!this.socket) return;
    this.socket.disconnect();
    return this.socket;
  }

  public onConnected(cb: CallbackType<unknown>) {
    this.register("connected", cb);
  }
  public onDisconnected(cb: CallbackType<unknown>) {
    this.register("disconnected", cb);
  }

  public onBoardUpdated(cb: CallbackType<IBoard>) {
    this.register(this.board.onBoardUpdated, cb);
  }
  public emitBoardUpdate(data: unknown) {
    return this.instance.emit(
      this.board.emitBoardUpdate,
      {
        event: this.board.emitBoardUpdate,
        ...data,
      }

    )
  }

  public onListCreated(cb: CallbackType<IList>) {
    this.register(this.board.onListCreated, cb)
  }
  public emitListCreate(data: IBordListCreateProps) {
    this.instance.emit(
      this.board.emitListCreate,
      {
        event: this.board.emitListCreate,
        ...data
      }
    )
  }

  public onListDeleted(cb: CallbackType<IBordListDeleteProps>) {
    this.register(this.board.onListDeleted, cb)
  }
  public emitListDelete(data: IBordListDeleteProps) {
    this.instance.emit(
      this.board.emitListDeleted,
      {
        event: this.board.emitListDeleted,
        ...data,
      }
    )
  }

  public onListUpdated(cb: CallbackType<any>) {
    this.register(this.board.onListUpdated, cb)
  }
  public emitListUpdate(data: any) {
    this.instance.emit(
      this.board.emitListUpdate,
      {
        event: this.board.emitListUpdate,
        ...data,
      }
    )
  }

  public onListReordered(cb: CallbackType<Array<IList>>) {
    this.register(this.board.onListReordered, cb)
  }
  public emitListReorder(data: IList[]) {
    this.instance.emit(
      this.board.emitListReorder,
      {
        event: this.board.emitListReorder,
        lists: data
      }
    )
  }
}
