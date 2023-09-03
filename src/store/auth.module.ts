import type {
  IAuthState,
  IAuthLoginProps, IAuthDataReturn, IUser
} from '@/interfaces'
import api from '@/api'
import { AuthLocalService } from '@/api/services/auth-local.service'

const service = new AuthLocalService<IUser>();

const state: IAuthState = {
  isAuth: !!service.getLocalAccessToken() && !!service.getLocalUserData(),
  user: service.getLocalUserData(),
  error: null,
}

const mutations = {
  login(state: IAuthState, data: IAuthDataReturn) {
    state.isAuth = true;
    state.user = data.user;
    service.updateLocalAccessToken(data.accessToken);
    service.updateLocalRefreshToken(data.refreshToken);
    service.updateLocalUserData(data.user);
  },
  logout(state: IAuthState) {
    state.isAuth = false;
    state.user = null;
    state.error = null;
    service.clear();
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
  me: (state: IAuthState): IUser | null => state.user,
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
