const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const cors = require("cors");

const express = require("express");
const port = process.env.PORT || 8001;
const app = express();

app.use(express.json());

// CORS
let allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

mongoose.set("strictQuery", false);
const username = process.env.ATLAS_USERNAME;
const password = process.env.ATLAS_PASSWORD;
const mongoUrl = `mongodb+srv://cluster0.fzwrfga.mongodb.net/?retryWrites=true&w=majority`;
const databaseName = process.env.ATLAS_DB_NAME;

async function main() {
  await mongoose.connect(mongoUrl, {
    dbName: databaseName,
    user: username,
    pass: password,
  });
}

main()
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
