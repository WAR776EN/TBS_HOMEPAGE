exports.errHandler = async (err, req, res, next) => {
  try {
    
  }
  catch(err) {
    res.status(500).json({
      success: false,
      message: 'internal server error'
    })
  }
}