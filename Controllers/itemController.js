const ItemModel = require('../Models/itemModel');
const seedItems = require('../Utils/data');
const dbState = require('../config/dbState');

const localItems = [...seedItems];

const getItemController = async (req, res) => {
  try {
    if (!dbState.connected) {
      return res.status(200).send(localItems);
    }

    const items = await ItemModel.find();
    return res.status(200).send(items);
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    return res.status(500).json({ message: err.message });
  }
};

const addItemController = async (req, res) => {
  try {
    const { name, price, category, image } = req.body;

    if (!name || !price || !category || !image) {
      return res.status(400).json({ message: 'name, price, category and image are required' });
    }

    if (!dbState.connected) {
      const fallbackItem = { _id: `${Date.now()}`, name, price, category, image };
      localItems.push(fallbackItem);
      return res.status(201).json({ message: 'Item added successfully (fallback mode)!', item: fallbackItem });
    }

    const newItem = new ItemModel({
      name,
      price,
      category,
      image,
    });

    await newItem.save();
    return res.status(201).json({ message: 'Item added successfully!', item: newItem });
  } catch (err) {
    console.log(`Error: ${err.message}`.bgRed.white);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getItemController, addItemController };
