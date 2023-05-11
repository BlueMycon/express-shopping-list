"use strict";

const express = require("express");
const { Item } = require("./fakeDb");
const { invalidName, missingData } = require("./middleware");
const router = new express.Router();
router.use(express.json());


/**Route for a get request to /items */
router.get("/", function (req, res) {
  console.log(Item);
  return res.json({ items: Item.all() });
});


/**Route for a post request to /items */
router.post(
  "/",
  missingData,
  function (req, res) {
  const requestObj = req.body;
  const { name, price } = Item.add(requestObj);

  return res.status(201).json({ added: { name, price } });
});


router.use("/:name", invalidName);

/**Route for a get request to specific /item/:name */
router.get("/:name", function (req, res) {
  const itemName = req.params.name;
  const { name, price } = Item.get(itemName);

  return res.json({ name, price });
});

/**Route for a patch request to update specific /item/:name */
router.patch("/:name", function (req, res) {
  console.log("\n\n testing")
  const itemName = req.params.name;
  console.log("\n\nitemName=", itemName);
  const jsonBody = req.body;
  const { name, price } = Item.updateName(itemName, jsonBody.name);

  return res.json({ name, price });
});

/**Route for a delete request to delete specific /item/:name */
router.delete("/:name", function (req, res) {
  const itemName = req.params.name;
  Item.delete(itemName);

  return res.json({ message: "Deleted" });
});

module.exports = router;
