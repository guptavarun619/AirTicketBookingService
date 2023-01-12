const { NOTIFICATION_BINDING_KEY } = require("../config/serverConfig");
const { createChannel, publishMessage } = require("../utils/messageQueue");

const sendNotificationEmail = async (data) => {
  try {
    const channel = createChannel();
    const payload = {
      data: data,
      service: "CREATE_TICKET",
    };
    publishMessage(
      channel, // yeah global kese karu?,
      NOTIFICATION_BINDING_KEY,
      JSON.stringify(payload)
    );
    return true;
  } catch (error) {
    console.log("Failed to enqueue email notification");
    return false;
  }
};

module.exports = { sendNotificationEmail };
