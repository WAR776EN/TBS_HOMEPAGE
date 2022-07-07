const express = require('express');
const router = express.Router();
const productRouter = require('./product')

const allRoutes = [
  {
    path: '/',
    route: require('./_init')
  },
  {
    path: '/product',
    route: require('./product')
  }
]

allRoutes.forEach(route => { 
  router.use(route.path, route.route) 
})

module.exports = router