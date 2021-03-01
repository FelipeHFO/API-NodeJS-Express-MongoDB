const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Essa função faz algo antes de salvar
// * O Node não aceita arrow function, pois o Ecma Script precisa ser configurado, então a função assíncrona anônima que tem parâmetro 'next' precisa ser escrita dessa forma para funcionar.
UserSchema.pre('save', async function (next) {
  const passwordHashed = await bcrypt.hash(this.password, 10);
  this.password = passwordHashed;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
