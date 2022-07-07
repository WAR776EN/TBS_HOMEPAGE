const { Product } = require('../models')

exports.create = async (req, res, next) => {
  try {
      let product = await Product.create(req.body)
      
      res.status(200).json({
        success: true,
        message: `product created`,
        data: product
      })
      next()
  }
  catch (err) {
      next(err)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query

    const fieldProjection = `_id name description_short price ratings size`
    const allProducts = await Product
      .find({}, fieldProjection)
      .skip((page - 1) * size)
      .limit(size);

    res.status(200).json({
      success: true,
      message: `all products`,
      data: allProducts,
      _meta: {
        page: +page,
        data_per_page: +size
      }
    })
  }
  catch(err) {
    next(err)
  }
}

exports.getRecommendation = async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query
    const fieldProjection = `_id name description_short price ratings size`
    const allProducts = await Product
      .find({ recommendation: true }, fieldProjection)
      .skip((page - 1) * size)
      .limit(size);

    res.status(200).json({
      success: true,
      message: `all products`,
      data: allProducts,
      _meta: {
        page: +page,
        data_per_page: +size
      }
    })
  }
  catch(err) {
    next(err)
  }
}