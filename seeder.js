const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectdb = require('./config/config');
const ItemModel = require('./Models/itemModel');
const items = require('./Utils/data');

dotenv.config();
connectdb();

const importData = async () => {
    try{
        await ItemModel.deleteMany()
        const itemsData = await ItemModel.insertMany(items)
        console.log(`Data Successfully Imported: ${itemsData.length} items`.bgGreen.green);
        process.exit();
    }catch(err){
        console.log(`Error: ${err.message}`.bgRed.white)
        process.exit(1);
    }
};

importData();