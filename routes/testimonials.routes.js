//testimonial.routes.js

const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAllEntrys);
router.get('/testimonials/:id', TestimonialController.getEntryById);
router.post('/testimonials', TestimonialController.addNewEntry); 
router.put('/testimonials/:id', TestimonialController.editEntry); 
router.delete('/testimonials/:id', TestimonialController.deleteEntry); 

module.exports = router;