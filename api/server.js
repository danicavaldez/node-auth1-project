const express = require("express");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const apiRouter = require("./api-router");


const sessionConfig = {
  name: "sugarCookie",
  secret: "sugarcookierecipe",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  
  store: new knexSessionStore({
    knex: require("../database/db-config.js"),
    tablename: "sessions",
    sidefieldname: "sid",
    createtable: true,
    clearInterval: 100 * 60 * 60
  })
};

const server = express();

server.use(session(sessionConfig));
server.use(express.json());
server.use("/api", apiRouter);

module.exports = server;
