import axios from 'axios'
import type { CreateAxiosDefaults } from 'axios'
import { AuthLocalService } from '@/api/services/auth-local.service'
import { AuthPath } from '@/api/paths/AuthPath'
import router from '../router'

const baseURL = import.meta.env.VITE_API_PATH;

const service = new AuthLocalService();
const path = new AuthPath()

const axiosDefaults: CreateAxiosDefaults = {
  baseURL
} as CreateAxiosDefaults;

const restInstance = axios.create({...axiosDefaults});

restInstance.interceptors.request.use(
  (config) => {
    const token = service.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

restInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    if(!err.response) return Promise.reject(err);

    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const token = service.getLocalRefreshToken();
        const {data} = await axios.get(`${axiosDefaults.baseURL}${path.refresh}`, {
          headers: { Authorization: `Bearer ${token || ""}` }
        });

        const { accessToken, refreshToken, user } = data;

        service.updateLocalAccessToken(accessToken);
        service.updateLocalRefreshToken(refreshToken);
        service.updateLocalUserData(user);

        return restInstance(originalConfig);
      } catch (_error) {
        service.clear();
        window.location.reload();
        //TODO: how to get router in this place ?
        // router.push({path: "/login"})
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  }
);

export default restInstance;
