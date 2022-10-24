const router = require('express').Router();
const fs = require('fs');
const {
  getAllInventories,
  editInventoryDetails,
  getSingleItem,
  deleteInventoryItem,
  addInventoryItem,
} = require('../controllers/inventoriesController');

router.get('/', getAllInventories);
router.get('/:itemId', getSingleItem);
router.delete('/:itemId', deleteInventoryItem);
router.put('/:inventoryId', editInventoryDetails);
router.post('/', addInventoryItem);

module.exports = router;
