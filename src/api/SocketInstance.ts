import { io, Socket } from 'socket.io-client'
import type { SocketOptions } from 'socket.io-client'
import type { ManagerOptions } from 'socket.io-client/build/esm/manager'

const baseUrl = import.meta.env.VITE_WS_PATH

export type OptionsType = Partial<ManagerOptions & SocketOptions>

export class SocketInstance {
  private socket: Socket;

  of(path?:string, options?: OptionsType):Socket {
    this.socket = io(baseUrl + path, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      ...options,
    });
    return this.socket;
  }
}
