const express = require('express');
const router = express.Router();

const allRoutes = [
  {
    path: '/',
    route: require('./_init')
  },
  {
    path: '/product',
    route: require('./product')
  },
  {
    path: '/campaign',
    route: require('./campaign')
  }
]

allRoutes.forEach(route => { 
  router.use(route.path, route.route) 
})

module.exports = router