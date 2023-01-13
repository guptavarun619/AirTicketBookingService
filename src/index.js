const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");

const initializeServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/booking/api/v1/ping", (req, res) => {
    return res.json({ message: "Response from Booking service" });
  });
  app.use("/booking/api", apiRoutes);

  app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

initializeServer();
