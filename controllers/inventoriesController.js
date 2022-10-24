const fs = require("fs");
const inventoriesModel = require("../models/inventoriesModel");
const helpers = require("../utils/helpers");

//get list of all inventory
const getAllInventories = (req, res) => {
  const inventories = inventoriesModel.getAllInventories(req.query);
  res.status(200).json(inventories);
};

// PUT/EDIT an Inventory Item

const editInventoryDetails = (req, res) => {
  if (!req.body) {
    res.status(400).json("Error, fill in the form");
  }
  if (!req.params) {
    res.status(400).json("Error, please provide an ID");
  }

  const inventory = inventoriesModel.editInventoryDetails(req.params, req.body);

  if (inventory) {
    res.status(201).json(inventory);
  } else {
    res.status(404).json({
      message: `Couldn't find inventory with ID ${req.params.inventoryId}`,
    });
  }
};

const getSingleItem = (req, res) => {
  const requestedItemId = req.params.itemId;
  const items = inventoriesModel.getSingleItem(requestedItemId);
  res.status(200).json(items);
};

const deleteInventoryItem = (req, res) => {
  if (!req.param) {
    res.status(400).json("Error, you must provide a valid item ID");
  }

  const inventories = inventoriesModel.deleteInventoryItem(req.params);
  res.status(204).json(inventories);
};

const addInventoryItem = (req, res) => {
  if (!req.body) {
    res.status(500).json("Error, the request needs a body");
  }
  const inventories = inventoriesModel.addInventoryItem(req.body);
  res.status(201).json(inventories);
};

module.exports = {
  getAllInventories,
  editInventoryDetails,
  deleteInventoryItem,
  getSingleItem,
  addInventoryItem,
};
