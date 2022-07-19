import { ApiClient } from '../ApiClient';

export class AuthApiClient extends ApiClient {
  static async login(username: string, password: string) {
    return this.postJson(`${this.SERVER_HOST}/auth/login`, {
      username,
      password,
    });
  }
}
