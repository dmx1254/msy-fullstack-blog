const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./database/db.js");
const { checkUser } = require("./middleware/Chech");
const { requireAuth } = require("./middleware/Chech");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const PORT = 5000 || process.env.PORT

const app = express();
const corsOptions = {
  origin: "/*",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.get("/*", checkUser);
app.get("/jwtid", requireAuth, (req, res, next) => {
  res.status(200).send(res.locals.user._id);
});
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () =>
  console.log(`listenning on port ${process.env.PORT}`)
);
