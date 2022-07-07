const { Campaign } = require('../models')

exports.create = async (req, res, next) => {
  try {
      let product = await Campaign.create(req.body)
      
      res.status(200).json({
        success: true,
        message: `campaign created`,
        data: product
      })
  }
  catch (err) {
      next(err)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query

    const fieldProjection = `_id name description_short image`
    const allProducts = await Campaign
      .find({}, fieldProjection)
      .skip((page - 1) * size)
      .limit(size);

    res.status(200).json({
      success: true,
      message: `all campaigns`,
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

exports.getActiveCampaign = async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query
    const fieldProjection = `_id name image description_short`

    const allProducts = await Campaign
      .find({
        startDate: { $gte: new Date() },
        endDate: { $lte: new Date() }
       }, fieldProjection)
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