//seats.routes.js

const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAllEntrys);
router.get('/seats/:id', SeatController.getEntryById);
router.post('/seats', SeatController.addNewEntry); 
router.put('/seats/:id', SeatController.editEntry); 
router.delete('/seats/:id', SeatController.deleteEntry); 

module.exports = router;