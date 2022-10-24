const { request } = require("express");
const helpers = require("../utils/helpers");
const crypto = require("crypto");
const fs = require("fs");

const getAllWarehouses = (query) => {
  let warehouses = helpers.getWarehouses();
  const label = query.label;

  if (!query.order) {
    return warehouses;
  }

  if (query.label === "warehouseName") {
    if (query.order === "descending") {
      warehouses.sort((a, b) => (a.name < b.name ? 1 : -1));
      return warehouses;
    } else if (query.order === "ascending") {
      warehouses.sort((a, b) => (a.name > b.name ? 1 : -1));
      return warehouses;
    }
  }

  if (query.label === "address") {
    if (query.order === "descending") {
      warehouses.sort((a, b) =>
        Number(a[label].split(" ")[0]) < Number(b[label].split(" ")[0]) ? 1 : -1
      );
      return warehouses;
    } else if (query.order === "ascending") {
      warehouses.sort((a, b) =>
        Number(a[label].split(" ")[0]) > Number(b[label].split(" ")[0]) ? 1 : -1
      );
      return warehouses;
    }
  }

  if (query.label === "contactName") {
    if (query.order === "descending") {
      warehouses.sort((a, b) => (a.contact.name < b.contact.name ? 1 : -1));
      return warehouses;
    } else if (query.order === "ascending") {
      warehouses.sort((a, b) => (a.contact.name > b.contact.name ? 1 : -1));
      return warehouses;
    }
  }

  if (query.label === "contactInfo") {
    if (query.order === "descending") {
      warehouses.sort((a, b) => (a.contact.email < b.contact.email ? 1 : -1));
      return warehouses;
    } else if (query.order === "ascending") {
      warehouses.sort((a, b) => (a.contact.email > b.contact.email ? 1 : -1));
      return warehouses;
    }
  }
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

// Delete a Warehouse plus it's corresponding inventory
const deleteWarehouse = (params) => {
  let warehouses = helpers.getWarehouses();
  const id = params.warehouseID;
  deleteWarehouseInventory(id);
  const selectedWarehouseIndex = helpers.getSelectedWarehouse(id);
  warehouses.splice(selectedWarehouseIndex, 1);
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouses));
  return warehouses;
};

const deleteWarehouseInventory = (id) => {
  let inventories = helpers.getInventories();
  const selectedInventoryIndex = helpers.getSelectedInventory(id);
  inventories = inventories.filter((inventory) => {
    return inventory.warehouseID != id;
  });
  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventories));
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
  return inventoryItems;
};

const sortWarehouses = (query) => {
  const warehouses = helpers.getWarehouses();
  let sortedWarehouses = warehouses.sort((a, b) => (a.name > b.name ? 1 : -1));
  return sortedWarehouses;
};

module.exports = {
  getAllWarehouses,
  addWarehouse,
  editWarehouseDetails,
  getSingleWarehouse,
  getWarehouseInventory,
  sortWarehouses,
  deleteWarehouse,
};
