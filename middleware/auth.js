const jwt = require('jsonwebtoken')

const authorizationMiddleware = (req, res, next) => {
  console.log('--- AUTH MIDDLEWARE ---');
console.log('Authorization middleware hit');
    const authHeader = req.headers.authorization;
  console.log('🔐 AUTHORIZATION MIDDLEWARE');

 /* if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized brobro' });
  }*/
console.log('hit middleware')
  //const token = authHeader.split(' ')[1];
 console.log('Cookies received:', req.cookies);

const token = req.cookies.jid
  console.log('📦 Token from cookie:', token);

console.log('Token:', token);

if(!token)  {   console.log('❌ No token found');
 return res.status(401).json({ error: 'Unauthorized: No token' });
}
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ JWT decoded successfully:', payload);

    console.log('decoded:', payload)

    //req.user = { userId: payload.userId, name: payload.name };
    req.user = { userId: payload.userId, name: payload.name };
    console.log(req.user)
console.log('hey man ur doing it')
    next();
  } catch (error) {
        console.log('❌ JWT verification failed:', err.message);

     return res.status(401).json({ error: 'Invalid or expired token' });

  }
}

module.exports = authorizationMiddleware