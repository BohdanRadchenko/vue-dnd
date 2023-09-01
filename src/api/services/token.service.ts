
export class TokenService {
  private readonly ACCESS_KEY: string = "access_token";
  private readonly REFRESH_KEY: string = "refresh_token";

  private getDataByKey(key: string): string {
    return <string>localStorage.getItem(key)
  }

  private setDataByKey(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  public getLocalAccessToken(): string | null {
    return this.getDataByKey(this.ACCESS_KEY);
  }

  public updateLocalAccessToken(token: string) {
    this.setDataByKey(this.ACCESS_KEY, token);
  }

  public removeLocalAccessToken() {
    localStorage.removeItem(this.ACCESS_KEY)
  }

  public getLocalRefreshToken(): string | null {
    return this.getDataByKey(this.REFRESH_KEY);
  }

  public updateLocalRefreshToken(token: string) {
    this.setDataByKey(this.REFRESH_KEY, token);
  }

  public removeLocalRefreshToken() {
    localStorage.removeItem(this.REFRESH_KEY)
  }

  public crear() {
    this.removeLocalAccessToken();
    this.removeLocalRefreshToken();
  }
}
