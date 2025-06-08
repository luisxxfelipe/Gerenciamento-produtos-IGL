const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do cabeçalho Authorization

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id; // Armazena o ID do usuário decodificado no objeto de requisição
    next();
  });
}

module.exports = verifyToken;