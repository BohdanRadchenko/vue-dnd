import { AbstractService } from '@/api/services/abstract.service'
import { Socket } from 'socket.io-client'
import { SocketInstance } from '@/api/SocketInstance'
import type { OptionsType } from '@/api/SocketInstance'
import { AuthLocalService } from '@/api/services/auth-local.service'
import type { IBoard, IUser } from '@/interfaces'

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

  public update(data: unknown) {
    return this.instance.emit("update", data)
  }

  public register() {


  }
}
