require('dotenv').config();

const SERVER = {
  PORT: process.env.SERVER_PORT
};

const SEQUELIZE = {
  HOST: process.env.SEQ_HOST,
  USER: process.env.SEQ_USER,
  PASSWORD: process.env.SEQ_PASSWORD,
  DATABASE: process.env.SEQ_DATABASE,
  DIALECT: process.env.SEQ_DIALECT
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
