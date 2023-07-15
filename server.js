const express = require("express");
const routes = require("./routes");
// import sequelize connection
const sequelize = require("./config/connection.js");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.listen(3000, () => {
  console.log("server is lsting on port 3000");
});

// Sync Sequelize models to the MySQL database on server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
