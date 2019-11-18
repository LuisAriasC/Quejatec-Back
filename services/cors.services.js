function getCorsMiddleware() {
    return (req, res, next) => {
      res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PATCH, DELETE'
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
  
      next();
    };
  }
  
  module.exports = { getCorsMiddleware };
  