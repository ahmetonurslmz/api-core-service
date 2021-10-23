const axios = require('axios');

module.exports = (type, defaultUrl = '') => axios.create({
  baseURL: defaultUrl || process.env[type],
});
