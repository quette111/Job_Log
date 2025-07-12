import jwt from 'jsonwebtoken';

const authorizationMiddleware = (req, res, next) => {

  const token = req.cookies.jid

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token' });
  }
  try {

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();

  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export default authorizationMiddleware;
