import type {
  IAuthStore,
  IAuthLoginProps, IAuthDataReturn
} from '@/interfaces'
import api from '@/api'
import { TokenService } from '@/api/services/token.service'

const service = new TokenService();

const state: IAuthStore = {
  isAuth: !!service.getLocalAccessToken(),
  user: null,
  error: null,
}

const mutations = {
  login(state: IAuthStore, data: IAuthDataReturn) {
    state.isAuth = true;
    state.user = data.user;
    service.updateLocalAccessToken(data.accessToken);
    service.updateLocalRefreshToken(data.refreshToken);
  },
  logout(state: IAuthStore) {
    state.isAuth = false;
    state.user = null;
    service.crear();
  },
  setError(state: IAuthStore, error: string) {
    state.error = error;
  }
}

const actions = {
  async logout ({ commit }) {
    try {
      console.log('logout');
      await api.auth.logout();
      commit('logout');
      return Promise.resolve();
    } catch (ex) {
      commit('setError', ex.message);
      return Promise.reject(ex)
    }
  },
  async login ({ commit }, data: IAuthLoginProps) {
    try {
      const loginData = await api.auth.login(data);
      commit('login', loginData);
      return Promise.resolve(loginData);
    } catch (ex) {
      commit('setError', ex.message);
      return Promise.reject(ex)
    }
  },
  async register ({ commit }, data: IAuthLoginProps) {
    try {
      const loginData = await api.auth.register(data);
      commit('login', loginData);
      return Promise.resolve(loginData);
    } catch (ex) {
      commit('setError', ex.message);
    }
  },
}

const getters = {
  isAuth: (state: IAuthStore): boolean => state.isAuth,
}


export default {
  state,
  mutations,
  actions,
  getters,
}
