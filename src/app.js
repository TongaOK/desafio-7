import express from "express";
import { __dirname } from "./utilities.js";
import path from "path";
import handlebars from "express-handlebars";
import { URI } from "./db/mongodb.js"
import MongoStore from "connect-mongo";
import expressSession from "express-session";
import { init as initPassportConfig, githubStrategyInit } from "./config/passport.config.js"

import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import homeRouter from "./routers/home.router.js";
// import RTPRouter from "./routers/realtimeproducts.router.js";
import sessionsRouter from "./routers/sessions.router.js";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

const app = express();
const SESSION_SECRET = "Tonga";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 600
  })
}))

app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    
  })
);
//app.engine("handlebars", handlebars.engine());
console.log(__dirname);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

initPassportConfig();
githubStrategyInit();
app.use(passport.initialize())
app.use(passport.session())

app.use("/", homeRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
// app.use("/api/realtimeproducts", RTPRouter);
app.use("/api/sessions", sessionsRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error inesperado ${error.message}`
  console.log(message);
  res.status(500).json({ status: 'error', message });
})

export default app;
