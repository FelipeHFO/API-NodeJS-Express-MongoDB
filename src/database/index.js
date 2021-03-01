const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
