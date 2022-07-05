const { isLogged } = require('./utils/roles-checker')

require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config/session.config")(app)
require("./config")(app);

const projectName = 'Nike | Shop'
app.locals.appTitle = `${projectName}`

app.locals.globalIsLogin = false


const index = require("./routes/index.routes");
app.use("/", index);


require("./error-handling")(app);

module.exports = app;
