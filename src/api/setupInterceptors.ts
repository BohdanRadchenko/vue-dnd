import restInstance from "./restInstance";
import {TokenService} from "./services/token.service";

const service = new TokenService();

const setup = store => {
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
          originalConfig.headers["Authorization"] = 'Bearer ' + token;
          const {data} = await restInstance.post("/auth/refresh");

          const { accessToken, refreshToken } = data;

          store.dispatch('auth/refreshToken', accessToken);
          service.updateLocalAccessToken(accessToken);
          service.updateLocalRefreshToken(refreshToken);

          return restInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
