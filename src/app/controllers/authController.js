// Essencials
const express = require('express');
const router = express.Router();

//Models
const User = require('../models/user');

//Config
const authConfig = require('../../config/auth.json')

//Utils
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Funções
function geraToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exists' });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.status(200).send(
      {
        user,
        token: geraToken({id: user.id})
     }
    );
  } catch (error) {
    return res.status(400).send({ error: 'Resgistration failed' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  //.select('+password') é para puxar também a senha já que no Esquema está setado para não puxar
  const user = await User.findOne({ email }).select('+password'); 

  if (!user) return res.status(400).send({ error: 'User not found!' });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: 'Invalid password!' });

  user.password = undefined;


  res.status(200).send(
    { 
      user, 
      token: geraToken({id: user.id})
    }
  );
});

module.exports = (app) => app.use('/auth', router);
