const result = require('dotenv').config();
const SERVER = {
  PORT: process.env.SERVER_PORT,
  HOST: process.env.SERVER_HOST
};
const SEQUELIZE = {
  HOST: process.env.SEQ_HOST,
  USER: process.env.SEQ_USER,
  PASSWORD: process.env.SEQ_PASSWORD,
  DATABASE: process.env.SEQ_DATABASE,
  DIALECT: process.env.SEQ_DIALECT,
  FORCE: process.env.SEQ_FORCE,
  LOGGING: process.env.SEQ_LOGGING === 'true' ? console.log : null
};

const CRYPTO = {
  ALGORITHM: process.env.CRYPTO_ALGORITHM,
  PASSWORD: process.env.CRYPTO_PASSWORD,
  HASH_ALGORITHM: process.env.CRYPTO_HASH_ALGORITHM
};

const JWT = {
  SECRET: process.env.JWT_SECRET,
  EXPIRES: process.env.JWT_EXPIRES_MS
};

module.exports = {
  SERVER,
  SEQUELIZE,
  CRYPTO,
  JWT
};
