const express = require("express");
const {
  createInventoryRecord,
  getInventoryById,
  getInventoryByProductId,
  updateInventory,
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/create/record", createInventoryRecord);
router.post("/get/inventory/Id", getInventoryById);
router.post("/get/inventory/ProductId", getInventoryByProductId);
router.put("/update/inventory", updateInventory);

module.exports = router;
