const axios = require('axios');

export default axios.create({
  baseURL: '/api',
  responseType: 'json',
  // transformResponse: [data => ({ data: JSON.parse(data) })],
});
