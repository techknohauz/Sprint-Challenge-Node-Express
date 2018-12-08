const express = require('express');
const cors = require('cors');

module.exports = server => {
  server.use(cors({ origin: 'http://localhost:3000' }));
  server.use(express.json());
}