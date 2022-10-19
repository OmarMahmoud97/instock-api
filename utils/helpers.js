const fs = require('fs');

const getInventories = () => {
  const fileContent = fs.readFileSync('./data/inventories.json');
  return JSON.parse(fileContent);
};

const getWarehouses = () => {
  const fileContent = fs.readFileSync('./data/warehouses.json');
  return JSON.parse(fileContent);
};

const getSelectedWarehouse = (id) => {
  const warehouses = getWarehouses();
  const selected = warehouses.findIndex((warehouse) => warehouse.id === id);
  return selected;
};

module.exports = { getWarehouses, getInventories, getSelectedWarehouse };
