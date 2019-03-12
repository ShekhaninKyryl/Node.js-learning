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
  PASSWORD: process.env.CRYPTO_PASSWORD
};

module.exports = {
  SERVER,
  SEQUELIZE,
  CRYPTO
};
