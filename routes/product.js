const express = require('express');
const router = express.Router()

const { 
  Product
} = require('../controllers')

router.post('/', Product.create)
router.get('/all', Product.getAll)
router.get('/recommendation', Product.getRecommendation)

module.exports = router