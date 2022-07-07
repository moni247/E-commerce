require("dotenv/config");

require("./db");

const express = require("express");
const app = express();

require("./config/session.config")(app)

require("./config")(app);

const projectName = 'Nike | Shop'
app.locals.appTitle = `${projectName}`

app.locals.globalIsLoggedIn = false

app.locals.userId

// app.locals.infoUser

const index = require("./routes/index.routes");

app.use("/", index);

require("./error-handling")(app);

module.exports = app;
