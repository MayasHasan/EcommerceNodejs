const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => console.log(`Database Connected `))
    .catch((err) => {
      console.log(`Database error: ${err}`);
      process.exit(1);
    });
};

module.exports = dbConnection;
