const { request } = require("express");
const helpers = require("../utils/helpers");
const crypto = require("crypto");
const fs = require("fs");

const getAllWarehouses = () => {
  const warehouses = helpers.getWarehouses();
  return warehouses;
};

const editWarehouseDetails = (params, body) => {
  const warehouses = helpers.getWarehouses();
  const id = params.warehouseID;

  const selectedWarehouseIndex = helpers.getSelectedWarehouse(id);

  warehouses[selectedWarehouseIndex] = {
    id: id,
    name: body.name,
    address: body.address,
    city: body.city,
    country: body.country,
    contact: {
      name: body.contact.name,
      position: body.contact.position,
      phone: body.contact.phone,
      email: body.contact.email,
    },
  };

  fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouses));
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

const getSingleWarehouse = (warehouseID) => {
  const warehouses = helpers.getWarehouses();

  const warehouse = warehouses.find((warehouse) => {
    return warehouse.id === warehouseID;
  });

  return warehouse;
};

// single warehouse inventory
const getWarehouseInventory = (warehouseID) => {
  const inventory = helpers.getInventories();
  const inventoryItems = inventory.filter((inventory) => {
    return inventory.warehouseID === warehouseID;
  });
  console.log(inventoryItems);
  console.log(inventoryItems.length);

  return inventoryItems;
};

module.exports = {
  getAllWarehouses,
  addWarehouse,
  editWarehouseDetails,
  getSingleWarehouse,
  getWarehouseInventory,
};
