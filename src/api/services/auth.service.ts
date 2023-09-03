import type { AxiosInstance } from 'axios'
import { AbstractService } from '@/api/services/abstract.service'
import type { IAuthLoginProps, IAuthDataReturn } from '@/interfaces'

export class AuthService extends AbstractService {
  constructor(private readonly instance: AxiosInstance) {
    super()
  }

  public async login(data : IAuthLoginProps) {
    return this.instance
      .post<IAuthDataReturn>(this.auth.login, data)
      .then(res => res.data);
  }

  public async register(data : IAuthLoginProps) {
    return this.instance
      .post<IAuthDataReturn>(this.auth.register, data)
      .then(({data}) => data);
  }

  public async logout() {
    return this.instance.get(this.auth.logout);
  }

  public async refresh() {
    return this.instance.get(this.auth.refresh);
  }
}
