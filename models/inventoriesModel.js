const { request } = require("express");
const helpers = require("../utils/helpers");
const crypto = require("crypto");
const fs = require("fs");

const getAllInventories = (query) => {
  let inventories = helpers.getInventories();
  if (!query.order) {
    return inventories;
  }
  if (query.label === "itemName") {
    if (query.order === "descending") {
      inventories.sort((a, b) => (a.itemName < b.itemName ? 1 : -1));
      return inventories;
    } else if (query.order === "ascending") {
      inventories.sort((a, b) => (a.itemName > b.itemName ? 1 : -1));
      return inventories;
    }
  }

  if (query.label === "category") {
    if (query.order === "descending") {
      inventories.sort((a, b) => (a.category < b.category ? 1 : -1));
      return inventories;
    } else if (query.order === "ascending") {
      inventories.sort((a, b) => (a.category > b.category ? 1 : -1));
      return inventories;
    }
  }

  if (query.label === "status") {
    if (query.order === "descending") {
      inventories.sort((a, b) => (a.status < b.status ? 1 : -1));
      return inventories;
    } else if (query.order === "ascending") {
      inventories.sort((a, b) => (a.status > b.status ? 1 : -1));
      return inventories;
    }
  }

  if (query.label === "quantity") {
    if (query.order === "descending") {
      inventories.sort((a, b) => (a.quantity < b.quantity ? 1 : -1));
      return inventories;
    } else if (query.order === "ascending") {
      inventories.sort((a, b) => (a.quantity > b.quantity ? 1 : -1));
      return inventories;
    }
  }

  if (query.label === "warehouseName") {
    if (query.order === "descending") {
      inventories.sort((a, b) => (a.warehouseName < b.warehouseName ? 1 : -1));
      return inventories;
    } else if (query.order === "ascending") {
      inventories.sort((a, b) => (a.warehouseName > b.warehouseName ? 1 : -1));
      return inventories;
    }
  }
};

const editInventoryDetails = (params, body) => {
  const inventories = helpers.getInventories();
  const warehouses = helpers.getWarehouses();
  const id = params.inventoryId;
  const selectedInventoryIndex = helpers.getSelectedInventory(id);
  const selectedWarehouse = warehouses.find((warehouse) => {
    return warehouse.name === body.warehouseName;
  });

  if (selectedInventoryIndex >= 0) {
    inventories[selectedInventoryIndex] = {
      id: id,
      warehouseName: selectedWarehouse.name,
      warehouseID: selectedWarehouse.id,
      itemName: body.itemName,
      description: body.description,
      category: body.category,
      status: body.status,
      quantity: body.quantity,
    };

    fs.writeFileSync("./data/inventories.json", JSON.stringify(inventories));

    return inventories[selectedInventoryIndex];
  } else {
    // We couldn't find the inventory item in the JSON file
    return false;
  }
};

const getSingleItem = (itemID) => {
  const items = helpers.getInventories();

  const item = items.find((item) => {
    return item.id === itemID;
  });

  return item;
};

const deleteInventoryItem = (params) => {
  const inventoryItems = helpers.getInventories();

  const updatedInventory = inventoryItems.filter(
    (item) => params.itemId !== item.id
  );

  fs.writeFileSync("./data/inventories.json", JSON.stringify(updatedInventory));
  return updatedInventory;
};
//----------------------------
const addInventoryItem = (inventoryItem) => {
  const inventories = helpers.getInventories();

  const newInventoryItem = {
    id: crypto.randomBytes(16).toString("hex"),
    warehouseID: inventoryItem.id,
    warehouseName: inventoryItem.warehouseName,
    itemName: inventoryItem.itemName,
    description: inventoryItem.description,
    category: inventoryItem.category,
    status: inventoryItem.status,
    quantity: inventoryItem.quantity,
  };

  inventories.push(newInventoryItem);
  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventories));
  return inventories;
};

module.exports = {
  getAllInventories,
  editInventoryDetails,
  deleteInventoryItem,
  getSingleItem,
  addInventoryItem,
};
