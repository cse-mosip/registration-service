const express = require("express");
const routes = require("./routes");
const cors = require("cors");
var morgan = require("morgan");
// import sequelize connection
const sequelize = require("./config/connection.js");

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const PORT = 8080;
const HOST = "0.0.0.0";
const BASE_URL = process.env.BASE_URL || "";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined"));
var options = {
    explorer: true,
    servers: [{
        url: `https://${HOST}:${PORT}${BASE_URL}`,
    }, ],
};

app.use(
    BASE_URL + "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
);

app.use(BASE_URL, routes);

// Sync Sequelize models to the MySQL database on server start
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Running on http://${HOST}:${PORT}${BASE_URL}`);
    });
});