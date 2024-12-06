const express = require('express');
const router = express.Router();
const geneticController = require('../controller/inventoryController')

// Main inventory page
router.get('/', (req, res) => {
    res.render('inventory/inventory'); 
});

// Lab equipment section
router.get('/equipment', (req, res) => {
    res.render('inventory/equipment'); 
});

router.get('/equipment/new', (req, res) => {
    res.render('inventory/newEquipment'); 
});


// Genetics section
router.get('/genetic-inventory',geneticController.getallGenetics )

router.get('/genetic-inventory/new', (req, res) => {
    res.render('inventory/newGenetics', {
    }); 
});

// // POST route to handle form submission
router.post('/genetic-inventory', geneticController.createGenetic)



// Delete routes
router.delete('/genetic/delete/:id',geneticController.deleteGenetic)



// Update routes 
router.put('/genetic/update/:id', geneticController.updateGenetic)

module.exports = router;
