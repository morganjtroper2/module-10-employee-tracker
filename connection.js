const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed', err.stack));

module.exports = client;