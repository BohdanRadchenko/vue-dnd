import { AuthPath } from '@/api/paths/AuthPath'


export abstract class AbstractService {
  private readonly _auth: AuthPath = new AuthPath();

  protected get auth(): AuthPath  {
    return this._auth;
  }
}
