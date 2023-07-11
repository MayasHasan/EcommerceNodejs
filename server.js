const express = require("express");
const path = require("path");
require("dotenv").config();
var morgan = require("morgan");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
app.use(express.json({ limit: "20kb" }));
app.use(mongoSanitize());
app.use(morgan("dev"));
const hpp = require("hpp");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
require("./config/Db")();

app.use("/uploads", express.static("uploads"));
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/errorMiddleware");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message:
    "Too many accounts created from this IP, please try again after an 15m",
});
app.use(hpp());

app.use("/api", apiLimiter);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subCategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.all("*", (req, res) => {
  throw new ApiError(`can't find this route${req.originalUrl}`, 404);
});

app.use(globalError);
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`listening on port ${port} ....`)
);

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err}`);
  server.close(() => {
    console.error(`Shutting down`);
    process.exit(1);
  });
});
