"use strict";

const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let popsicle = {name: "popsicle", "price": 1.45};

beforeEach(function() {
  db.Item.add(popsicle);
});

afterEach(function() {
  db.Item.deleteAll();
});

/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [popsicle] });
  });
});

/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", function() {
  it("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "chocolate",
        price: "1.00"
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({added: {name: "chocolate", price: "1.00" }});
    expect(db.Item.get("chocolate")).toEqual({name: "chocolate", price: "1.00" });
  });

  it("Responds with 400 if name invalid", async function() {
    const resp = await request(app).post(`/items`).send({ nonsense: "nonsense" });
    expect(resp.statusCode).toEqual(400);
  });

});


/** GET /items/:name - get item; return `{item: item}` */

describe("GET /items/:name", function() {
  it("Gets an item", async function() {
    const resp = await request(app)
    .get(`/items/${popsicle.name}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(popsicle);
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).get(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});


/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", function() {
  it("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${popsicle.name}`)
      .send({
        name: "wonderbar"
      });
    expect(resp.body).toEqual({name: "wonderbar", price: 1.45 });
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

/** DELETE /items/[name] - delete item,
 *  return `{message: "Item deleted"}` */

describe("DELETE /items/:name", function() {
  it("Deletes a single a item", async function() {
    const resp = await request(app)
      .delete(`/items/${popsicle.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.Item.all().length).toEqual(0);
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).delete(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

