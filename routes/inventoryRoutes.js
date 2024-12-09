const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController');

// ------------------ Main Inventory Page ------------------
router.get('/', inventoryController.getMainPage)

// ------------------ Lab Equipment Routes ------------------
// GET all lab equipment
router.get('/equipment', inventoryController.getAllEquipment);

// GET form to add new lab equipment
router.get('/equipment/new',inventoryController.getNewLabForm )
// POST route to add new lab equipment
router.post('/lab-inventory', inventoryController.createEquipment);

// DELETE route to remove lab equipment
router.delete('/equipment/delete/:id', inventoryController.deleteLab);

// PUT route to update genetics
router.put('/equipment/update/:id', inventoryController.updateLab);


// ------------------ Genetics Routes ------------------
// GET all genetics
router.get('/genetic-inventory', inventoryController.getallGenetics);

// GET form to add new genetics
router.get('/genetic-inventory/new',inventoryController.getNewGeneticForm)

// POST route to add new genetics
router.post('/genetic-inventory', inventoryController.createGenetic);

// PUT route to update genetics
router.put('/genetic/update/:id', inventoryController.updateGenetic);

// DELETE route to remove genetics
router.delete('/genetic/delete/:id', inventoryController.deleteGenetic);

module.exports = router;
