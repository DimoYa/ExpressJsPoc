const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");

const initDB = require("./models/index");

const { home } = require("./controllers/home");
const { about } = require("./controllers/about");
const create = require("./controllers/create");
const { details } = require("./controllers/details");
const { notFound } = require("./controllers/notFound");
const carService = require("./services/car");
const accessoryService = require("./services/accessory");
const authService = require("./services/auth");

const _delete = require("./controllers/delete");
const edit = require("./controllers/edit");
const accessory = require("./controllers/accessory");
const attach = require("./controllers/attach");
const {
  registerGet,
  loginGet,
  loginPost,
  registerPost,
  logout,
} = require("./controllers/auth");
const req = require("express/lib/request");
const { isLoggedIn } = require("./services/util");

start();

async function start() {
  await initDB();

  const app = express();

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: "auto" },
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
  app.use(carService());
  app.use(accessoryService());
  app.use(authService());

  app.engine(
    "hbs",
    hbs.create({
      extname: ".hbs",
    }).engine
  );
  app.set("view engine", "hbs");

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);

  app
    .route("/create")
    .get(isLoggedIn(), create.get)
    .post(isLoggedIn(), create.post);

  app
    .route("/delete/:id")
    .get(isLoggedIn(), _delete.get)
    .post(isLoggedIn(), _delete.post);

  app
    .route("/edit/:id")
    .get(isLoggedIn(), edit.get)
    .post(isLoggedIn(), edit.post);

  app
    .route("/accessory")
    .get(isLoggedIn(), accessory.get)
    .post(isLoggedIn(), accessory.post);

  app
    .route("/attach/:id")
    .get(isLoggedIn(), attach.get)
    .post(isLoggedIn(), attach.post);

  app.route("/register").get(registerGet).post(registerPost);

  app.route("/login").get(loginGet).post(loginPost);

  app.get("/logout", isLoggedIn(), logout);

  app.all("*", notFound);

  app.listen(3000, () => console.log("app startеd"));
}
