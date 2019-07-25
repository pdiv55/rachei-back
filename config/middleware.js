let jwt = require('jsonwebtoken');

const checkToken = (request, response, next) => {
  const token = request.headers['x-access-token'] || request.headers['authorization'];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return request.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    return response.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = checkToken;