const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE_URL: process.env.FLIGHT_SERVICE_URL,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  NOTIFICATION_BINDING_KEY: process.env.NOTIFICATION_BINDING_KEY,
};
