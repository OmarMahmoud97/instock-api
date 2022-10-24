const fs = require("fs");
const warehousesModel = require("../models/warehousesModel");
const helpers = require("../utils/helpers");
const { isPossiblePhoneNumber } = require("libphonenumber-js");

const getAllWarehouses = (req, res) => {
  const warehouses = warehousesModel.getAllWarehouses(req.query);
  res.status(200).json(warehouses);
};

// get single warehouse details
const getSingleWarehouse = (req, res) => {
  const requestedWarehouseId = req.params.warehouseID;
  const warehouses = warehousesModel.getSingleWarehouse(requestedWarehouseId);
  res.status(200).json(warehouses);
};

// get single warehouse inventory
const getWarehouseInventory = (req, res) => {
  const requestedWarehouseId = req.params.warehouseID;
  const inventory = warehousesModel.getWarehouseInventory(requestedWarehouseId);
  res.status(200).json(inventory);
};

// PUT/EDIT a Warehouse
const editWarehouseDetails = (req, res) => {
  if (!req.body) {
    res.status(400).json("Error, fill in the form");
  }
  if (!req.params) {
    res.status(400).json("Error, please provide an ID");
  }
  const warehouses = warehousesModel.editWarehouseDetails(req.params, req.body);
  res.status(201).send(warehouses);
};

const addWarehouse = (req, res) => {
  const emailFormat = new RegExp(".+@instock.com$");

  if (!req.body) {
    res.status(500).json("Error, the request needs a body");
  }

  if (!isPossiblePhoneNumber(req.body.contact.phone, "US")) {
    res.status(400).json("Error, not a valid number");
  }

  if (!emailFormat.test(req.body.contact.email)) {
    res.status(400).json("Error, not a valid email");
  }
  const warehouses = warehousesModel.addWarehouse(req.body);
  res.status(201).json(warehouses);
};

const deleteWarehouse = (req, res) => {
  if (!req.params) {
    res.status(400).json("Error, please provide a warehouse ID");
  }
  const warehouses = warehousesModel.deleteWarehouse(req.params, req.body);
  res.status(201).send(warehouses);
};

module.exports = {
  getAllWarehouses,
  addWarehouse,
  editWarehouseDetails,
  getSingleWarehouse,
  getWarehouseInventory,
  deleteWarehouse,
};
