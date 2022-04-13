//days.routes.js

const express = require('express');
const router = express.Router();

const DayController = require('../controllers/days.controller');

router.get('/days', DayController.getAllEntrys);
router.get('/days/:id', DayController.getEntryById);
router.post('/days', DayController.addNewEntry); 
router.put('/days/:id', DayController.editEntry); 
router.delete('/days/:id', DayController.deleteEntry); 

module.exports = router;