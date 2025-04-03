const ItemModel = require('../Models/itemModel');

const getItemController =  async (req,res) => {
  try{
    const items = await ItemModel.find();
    res.status(200).send(items);
  }catch(err){
    console.log(`Error: ${err.message}`.bgRed.white)
    res.status(500).json({message: err.message})
  }
}

const addItemController = async (req, res) => {
    try {
        const { name, price, category, image } = req.body;
    
        const newItem = new ItemModel({
        name,
        price,
        category,
        image,
        });
    
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully!', item: newItem });
    } catch (err) {
        console.log(`Error: ${err.message}`.bgRed.white);
        res.status(500).json({ message: err.message });
    }
}




module.exports = { getItemController, addItemController };