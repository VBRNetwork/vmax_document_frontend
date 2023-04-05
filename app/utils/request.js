import axios from 'axios';

const apiUrl = '/api';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options, method, data) {
  return axios({
    url: apiUrl + url,
    method,
    data,
    headers: options,
    withCredentials: true,
  })
}
