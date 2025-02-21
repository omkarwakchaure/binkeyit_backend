const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
const router = express.Router();
const userRouter = require("./routes/user.route.js");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const categoryRouter = require("./routes/category.route.js");
const uploadRouter = require("./routes/upload.route.js");
const subCategoryRouter = require("./routes/subCategory.route.js");
const productRouter = require("./routes/product.route.js");

// Middleware setup
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

// Async DB connection
const connectToDB = async () => {
  try {
    await connectDB();
    console.log("Connected to DB successfully");
  } catch (error) {
    console.error("Failed to connect to DB:", error);
  }
};

connectToDB().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
    console.log("Link: http://localhost:3001/.netlify/functions/api/");
  });
});

router.get("/", (req, res) => {
  res.send("App is running..");
});

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/file", uploadRouter);
router.use("/subcategory", subCategoryRouter);
router.use("/product", productRouter);

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
