const axios = require('axios');

module.exports = type => axios.create({
  baseURL: process.env[type],
});
