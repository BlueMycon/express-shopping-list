const app = require("./app");
let db = require("./fakeDb");
const { BadRequestError, NotFoundError } = require("./expressError");


function invalidName(req, res, next) {
  if (!db.Item.get(req.params.name)) {
    throw new NotFoundError("Invalid item name.")
  } else {
    next();
  }
}

function missingData(req, res, next) {
  if (!req.body.name || !req.body.price) {
    throw new BadRequestError("Missing inputs.")
  } else {
    next();
  }
}

module.exports = {
  invalidName,
  missingData
};
