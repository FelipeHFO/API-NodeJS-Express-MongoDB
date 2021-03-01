const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({error: 'No token provider'});
  
  const parts = authHeader.split(' ');

  if(!parts.length === 2)
    return res.status(401).send({error: 'Token error'});

  const [scheme, token] = parts;

  if(!/^Bearer$/i.test(scheme)){ // Regex para achar a palavra 'Bearer' na variável 'scheme'
    return res.status(401).send({error: 'Token malformatted'});
  }

  jwt.verify(token, authConfig.secret, (error, decode) => {
    if(error)
      return res.status(401).send({error: 'Invalid token'});
    
    req.userId = decode.id; //decode.id é porque passamos para a função geraToken um objeto contendo { id: ... }
    return next();
  })
}