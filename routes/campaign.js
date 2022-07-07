const express = require('express');
const router = express.Router()

const { 
  Campaign
} = require('../controllers')

router.post('/', Campaign.create)
router.get('/all', Campaign.getAll)
router.get('/recommendation', Campaign.getActiveCampaign)

module.exports = router