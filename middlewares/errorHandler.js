exports.errorHandler = async (err, req, res, next) => {
  /**
   * all types of error will be handled here
   * For now let's return all error with 400
   */
  try {
    res.status(400).json({
      success: false,
      message: 'Validation Error'
    })
  }
  catch(err) {
    res.status(500).json({
      success: false,
      message: 'internal server error'
    })
  }
}

exports._404Handler = async ( req, res, next) => {
  res.status(404).json({
      success: false,
      message: 'no such route'
  })
}