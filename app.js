"use strict";
/** Simple demo Express app. */

const express = require("express");
const itemsRoute = require("./itemsRoute");
const morgan = require("morgan");
// const { items } = require("./fakeDb");

const app = express();
app.use(express.json());

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

app.use("/items", itemsRoute);

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;