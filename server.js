const express = require("express");
const mongoose = require("mongoose");
//load env variables
require("dotenv").config();
const cors = require("cors");
const sliderRoute = require("./routes/slider");
const categoriesRoute = require("./routes/categories");
const subCategoriesRoute = require("./routes/sub-categories");
const productRoute = require("./routes/product/product");
const productSizesRoute = require("./routes/product/product-sizes");
const productHeadRoute = require("./routes/product/product-head");
const productCuttingRoute = require("./routes/product/product-cutting");
const productPreparationRoute = require("./routes/product/product-preparation");
const productdonationSideRoute = require("./routes/product/produt-donationSide");
const productdonationStatusRoute = require("./routes/product/product-donationStatus");

const orderRoute = require("./routes/order");

const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

const app = express();
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: `./locales/{{lng}}/translation.json`,
    },
  }); // i18next

app.use(middleware.handle(i18next)); // i18next middleware


//parsing json data
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

//cors
app.use(cors());
app.options("*", cors());

//mongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

// slider middleware
app.use("/api/v1/slider", sliderRoute);

// categories middleware
app.use("/api/v1/categories", categoriesRoute);

// sub categories middleware
app.use("/api/v1/sub-categories", subCategoriesRoute);

// product middleware
app.use("/api/v1/products", productRoute);

// sizes middleware
app.use("/api/v1/sizes", productSizesRoute);

// head middleware
app.use("/api/v1/head", productHeadRoute);

// cutting middleware
app.use("/api/v1/cutting", productCuttingRoute);

// preparation middleware
app.use("/api/v1/preparation", productPreparationRoute);

// donation-side middleware
app.use("/api/v1/donation-side", productdonationSideRoute);

// donation-status middleware
app.use("/api/v1/donation-status", productdonationStatusRoute);

// order middleware
app.use("/api/v1/orders", orderRoute);

//start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
