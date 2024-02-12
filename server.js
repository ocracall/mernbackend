require("dotenv").config();//essential at top to use dotenv
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require('./router/auth-router');// .js is default
const contactRoute = require('./router/contact-router');// .js is default
const serviceRoute = require('./router/service-router');// .js is default
const adminRoute = require('./router/admin-router');// .js is default
const BASE_URL = process.env.BASE_URL

const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


const corsOptions = {
  origin: `${BASE_URL}`,
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());//necessary for json post requests


app.use("/api/auth", authRoute);// route define for router( can be '/' also)
app.use("/api/form", contactRoute);// route define for router( can be '/' also)
app.use("/api/data", serviceRoute)
app.use("/api/admin", adminRoute)
app.use(errorMiddleware);//error middleware(line should be placed exactly above connection otherwise error middleware will not work)

const PORT = process.env.BASE_PORT
connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port: ${PORT}`);
    });
  });

//npm init -y
//npm i express
//npm i nodemon
//postman extension (how to use it)
//npm i mongoose
//npm i dotenv
//npm i bcrypt
//npm i jsonwebtoken
//npm i zod
//npm i cors