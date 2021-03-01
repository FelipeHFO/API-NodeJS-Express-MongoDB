const express = require('express');
const router = express.Router();

//Middlewares
const authMiddleware = require('../middlewares/auth');

//Executando o Middleware para autenticação
router.use(authMiddleware);


router.get('/', (req, res)=> {
  res.send( { msg: 'ok', userId: req.userId}) // Recuperando o ID do Usuário através do Token
})

module.exports = app => app.use('/project', router)