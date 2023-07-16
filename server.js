const express = require("express");
const routes = require("./routes");
const cors = require('cors');
// import sequelize connection
const sequelize = require("./config/connection.js");

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);

// Sync Sequelize models to the MySQL database on server start
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Running on https://${HOST}:${PORT}`);
    });
});
