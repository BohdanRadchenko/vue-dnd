import type {
  IAuthState,
  IAuthLoginProps, IAuthDataReturn
} from '@/interfaces'
import api from '@/api'
import { TokenService } from '@/api/services/token.service'

const service = new TokenService();

const state: IAuthState = {
  isAuth: !!service.getLocalAccessToken(),
  user: null,
  error: null,
}

const mutations = {
  login(state: IAuthState, data: IAuthDataReturn) {
    state.isAuth = true;
    state.user = data.user;
    service.updateLocalAccessToken(data.accessToken);
    service.updateLocalRefreshToken(data.refreshToken);
  },
  logout(state: IAuthState) {
    state.isAuth = false;
    state.user = null;
    service.crear();
  },
  setError(state: IAuthState, error: string) {
    state.error = error;
  }
}

const actions = {
  async LOGOUT ({ commit }) {
    try {
      await api.auth.logout();
      commit('logout');
      return Promise.resolve();
    } catch (ex) {
      commit('setError', ex.message);
      return Promise.reject(ex)
    }
  },
  async LOGIN ({ commit }, data: IAuthLoginProps) {
    try {
      const loginData = await api.auth.login(data);
      commit('login', loginData);
      return Promise.resolve(loginData);
    } catch (ex) {
      commit('setError', ex.message);
      return Promise.reject(ex)
    }
  },
  async REGISTER ({ commit }, data: IAuthLoginProps) {
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
  isAuth: (state: IAuthState): boolean => state.isAuth,
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
