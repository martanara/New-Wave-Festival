//concerts.routes.js

const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAllEntrys);
router.get('/concerts/:id', ConcertController.getEntryById);
router.post('/concerts', ConcertController.addNewEntry); 
router.put('/concerts/:id', ConcertController.editEntry); 
router.delete('/concerts/:id', ConcertController.deleteEntry); 

module.exports = router;