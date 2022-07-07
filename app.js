require("dotenv/config");

require("./db");

const express = require("express");
const app = express();

require("./config/session.config")(app)

require("./config")(app)

const { localsSetter } = require('./middleware/locals-setter')
app.use(localsSetter)


const index = require("./routes/index.routes");

app.use("/", index);

require("./error-handling")(app);

module.exports = app;
