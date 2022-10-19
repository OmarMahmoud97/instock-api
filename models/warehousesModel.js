const { request } = require("express");
const helpers = require("../utils/helpers");
const crypto = require("crypto");
const fs = require("fs");

const getAllWarehouses = () => {
  const warehouses = helpers.getWarehouses();
  return warehouses;
};

const addWarehouse = (warehouse) => {
  // Get all warehouses
  const warehouses = helpers.getWarehouses();

  // Create new warehouse object using request body
  const newWarehouse = {
    id: crypto.randomBytes(16).toString("hex"),
    name: warehouse.name,
    address: warehouse.address,
    city: warehouse.city,
    country: warehouse.country,
    contact: {
      name: warehouse.contact.name,
      position: warehouse.contact.position,
      phone: warehouse.contact.phone,
      email: warehouse.contact.email,
    },
  };

  // Add new object to warehouses array
  warehouses.push(newWarehouse);

  // Rewrite file
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouses));
  return warehouses;
};

module.exports = { getAllWarehouses, addWarehouse };