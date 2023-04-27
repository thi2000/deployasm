const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");
const authRoutes = require("./router/auth");
const productRoutes = require("./router/Product");
const adminRouters = require("./router/admin");
// const orderRoutes = require("./router/order");
const cookieparser = require("cookie-parser");

const mongoose = require("mongoose");

const urlmongo =
  "mongodb+srv://dinhthi:03042000thi@cluster0.vhklay1.mongodb.net/data";
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

app.set("trust proxy", true);

app.use(express.json());
app.use(authRoutes);

app.use(productRoutes);
app.use(adminRouters);
// app.use(orderRoutes);

mongoose
  .connect(urlmongo)
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
