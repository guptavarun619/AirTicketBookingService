const axios = require("axios");
const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_URL } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");
class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      // based on the `flightId` we need to fetch the flight from FlightsAndSearch service
      const getFlightRequestURL = `${FLIGHT_SERVICE_URL}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      let priceOfFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking process",
          "This flight doesn't have succficient seats"
        );
      }

      const totalCost = priceOfFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);

      const updateFlightRequestURL = `${FLIGHT_SERVICE_URL}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });

      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });

      return finalBooking;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
