const jwt = require('jsonwebtoken')

const authorizationMiddleware = (req, res, next) => {

console.log('Authorization middleware hit');
    const authHeader = req.headers.authorization;

 /* if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized brobro' });
  }*/
console.log('hit middleware')
  //const token = authHeader.split(' ')[1];
 console.log('Cookies received:', req.cookies);

const token = req.cookies.jid

console.log('Token:', token);

if(!token) return res.status(401)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log('decoded:', payload)

    //req.user = { userId: payload.userId, name: payload.name };
    req.userId = payload.userId
console.log('hey man ur doing it')
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized bro' });
  }
}

module.exports = authorizationMiddleware