const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoConnection } = require("./databases");
const router = require("./routes");
const helmet=require("helmet")
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet())


MongoConnection();
app.use('/api',router)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is listening at",PORT);
});

module.exports=app