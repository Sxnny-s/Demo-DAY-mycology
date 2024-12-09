const express = require('express');
const router = express.Router();
const mushroomController = require('../controller/MushroomController')

// ------------------ Main Grow Log Page ------------------
router.get('/', mushroomController.getIndexPage)

// ------------------ view and add new grows Routes ------------------
// rendering new grow form page
router.get('/new', mushroomController.getNewGrowForm)
// rendering all grow log form 
router.get('/all', mushroomController.getAllGrowsPage)
// Post request to add new grow details 
router.post('/new', mushroomController.startGrow)
// update stage
router.post('/next-stage/:id', mushroomController.updateStage)

module.exports = router;