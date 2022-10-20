const router = require("express").Router();
const warehousesData = require("../data/warehouses.json");
const fs = require("fs");
const {
  getAllWarehouses,
  addWarehouse,
  editWarehouseDetails,
  getSingleWarehouse,
  getWarehouseInventory,
} = require("../controllers/warehousesController");

router.get("/", getAllWarehouses);

router.get("/:warehouseID", getSingleWarehouse);

router.get("/:warehouseID/inventory", getWarehouseInventory);

router.put("/:warehouseID", editWarehouseDetails);

// router.delete("/:warehouseID");
router.post("/", addWarehouse);
module.exports = router;
