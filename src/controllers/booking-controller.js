const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { NOTIFICATION_BINDING_KEY } = require("../config/serverConfig");
const bookingService = new BookingService();

class BookingController {
  constructor() {}

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is a notification from queue",
        content: "Notifiction queue will subsribe this",
        recepientEmail: "nw6k5@emergentvillage.org",
        notificationTime: "2023-01-02T11:34:43",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, NOTIFICATION_BINDING_KEY, JSON.stringify(payload));
    return res.status(StatusCodes.OK).json({
      message: "Successfully published the event",
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Successfully completed booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explaination,
        data: {},
      });
    }
  }
}

module.exports = BookingController;
