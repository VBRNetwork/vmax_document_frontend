/* eslint-disable no-unused-vars */
import {
  refreshedUser,
  logoutUser,
  logoutUserFailed,
} from 'containers/App/user/actions';
import get from 'lodash/get';

const axios = require('axios');

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

export default function setupAxiosRefreshTokenInterceptor(
  axiosInstance,
  store,
) {
  let accessToken = get(store.getState().user, 'token');
  store.subscribe(() => {
    accessToken = get(store.getState().user, 'token');
  });
  axiosInstance.interceptors.response.use(
    response => response.data,
    error => {
      const errorResponse = error.response;
      if (isTokenExpiredError(errorResponse)) {
        return resetTokenAndReattemptRequest(error, accessToken);
      }
      return Promise.reject(errorResponse.data);
    },
  );

  function isTokenExpiredError(errorResponse) {
    if (errorResponse.data === 'Unauthorized' || errorResponse.status === 401)
      return true;
    return false;
  }

  function resetTokenAndReattemptRequest(error, tokenAccess) {
    try {
      const { response: errorResponse } = error;
      if (!tokenAccess) {
        return Promise.reject(error);
      }

      const retryOriginalRequest = new Promise(resolve => {
        addSubscriber(subscribeToken => {
          errorResponse.config.headers.Authorization = `JWT ${subscribeToken}`;
          errorResponse.transformResponse = [data => data.data];
          resolve(axios(errorResponse.config));
        });
      });

      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        axios({
          method: 'post',
          headers: {
            Authorization: `JWT ${tokenAccess}`,
          },
          url: `/api/auth/refresh/`,
          data: {
            token: tokenAccess,
          },
        })
          .then(response => {
            const newToken = response.data.token;
            store.dispatch(refreshedUser(response.data));
            isAlreadyFetchingAccessToken = false;
            onAccessTokenFetched(newToken);
          })
          .catch(() => {
            store.dispatch(logoutUserFailed());
          });
      }
      return retryOriginalRequest.then(response => response.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  function onAccessTokenFetched(subscribeToken) {
    // When the refresh is successful, we start retrying the requests one by one and empty the queue
    subscribers.forEach(callback => callback(subscribeToken));
    subscribers = [];
  }

  function addSubscriber(callback) {
    subscribers.push(callback);
  }
}
