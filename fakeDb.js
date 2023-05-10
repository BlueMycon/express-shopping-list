"use strict";
const items = [];

/**
 * Class for the item object
 */
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  /**Returns the array of all the item instances */
  static all() {
    return items;
  }

  /**Return a specific item via its name */
  static get(name) {
    return items.find(elem => elem.name === name);
  };

  /**Add an item to the Array db and return it */
  static add({ name, price }) {
    console.log({ name, price })
    const newItem = new Item(name, price);
    items.push(newItem);

    return newItem;
  }

  /**Delete an item from the Array db */
  static delete(name) {
    const index = items.findIndex(elem => elem === this.get(name));
    items.splice(index, 1);
  };

  /**Update an item in the array db with a new name */
  static updateName(name, newName) {
    const item = this.get(name);
    item.name = newName;
    return item;
  };
}


module.exports = { Item };