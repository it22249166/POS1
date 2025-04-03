const express = require('express');
const { getItemController } = require('../Controllers/itemController');
const { addItemController } = require('../Controllers/itemController');
const ItemModel = require('../Models/itemModel');
const router = express.Router();

//method-get
router.get('/getitem', getItemController);

//method-post
router.post('/additem', addItemController);




module.exports = router;