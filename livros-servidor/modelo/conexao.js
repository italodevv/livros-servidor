const mongoose = require('mongoose');

const banco = mongoose.connection;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connect('mongodb://localhost/Livraria', options);

banco.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
banco.once('open', () => {
  console.log('Conexão estabelecida com o MongoDB!');
});

module.exports = banco;
