const mongoose = require('mongoose');
require("dotenv").config();

let mongoURI = process.env.mongoURI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDb connected successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
}

module.exports = connectToMongo;