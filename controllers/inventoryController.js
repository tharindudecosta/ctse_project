const InventoryModel = require("../models/inventoryModel");

const createInventoryRecord = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const existingInventory = await InventoryModel.findOne({productId: productId });

    let action
    let updatedInventory;

    if (existingInventory) {
      existingInventory.quantity += quantity;
      updatedInventory = await existingInventory.save();
      action = "Added to Inventory"
    } else {
      updatedInventory = await InventoryModel.create({
        productId,
        quantity: quantity,
      });
      action = "Created new Inventory record"
    }
    res.status(200).json({inventory:updatedInventory,action:action});
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create inventory", error: error.message });
  }
};

const getInventoryById = async (req, res) => {
  try {
    const { inventoryId } = req.body;
    const inventory = await InventoryModel.findById(inventoryId);
    if (!inventory) {
      res.status(404).json({ message: "inventory not found" });
    } else {
      res.status(200).json(inventory);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to fetch inventory", error: error.message });
  }
};

const getInventoryByProductId = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      res.status(404).json({ message: "Product ID is required" });

    }

    const existingInventory = await InventoryModel.findOne({productId: productId });

    if (!existingInventory) {
      res.status(404).json({ message: "inventory not found" });
    }

    res.status(200).json(existingInventory);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to fetch inventory", error: error.message });
  }
};

const updateInventory = async (req,res) => {
  try {

    const { productId, quantity, action } = req.body;

    if (!productId || typeof quantity !== 'number' || !['add', 'remove'].includes(action)) {
      res.status(404).json({ message: "Invalid input" });
    }

    const inventory = await InventoryModel.findOne({ productId });

    if (!inventory) {
      res.status(404).json({ message: "inventory not found" });
    }

    let updatedQuantity = inventory.quantity;
    let message = '';

    if (action === 'add') {
      updatedQuantity += quantity;
      message = 'Inventory increased successfully';
    } else if (action === 'remove') {
      if (quantity >= inventory.quantity) {
        // quantity = inventory.quantity;
        let remaining = inventory.quantity
        updatedQuantity = 0;
        message = `Requested to remove more than available. Removed all ${remaining} units. Inventory is now empty.`;
      } else {
        updatedQuantity -= quantity;
        message = 'Inventory decreased successfully';
      }
    }

    inventory.quantity = updatedQuantity;
    const updatedInventory = await inventory.save();

    res.status(200).json({updatedInventory,message});


  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update inventory", error: error.message });
  }
};




module.exports = {
  createInventoryRecord,
  getInventoryById,
  getInventoryByProductId,
  updateInventory
};
