const fs = require("fs");

const readWarehouses = () => {
  const fileContent = fs.readFileSync("./data/warehouses.json");
  return JSON.parse(fileContent);
};

module.exports = { readWarehouses };
