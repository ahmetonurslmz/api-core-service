const axios = require('axios');

module.export = type => axios.create({
  baseURL: process.env[type],
});
