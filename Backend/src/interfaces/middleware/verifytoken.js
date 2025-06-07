const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id; // Armazena o ID do usuário decodificado no objeto de requisição
    next();
  });
}

module.exports = verifyToken;