const banco = require('./conexao');
const mongoose = require('mongoose');

const LivroSchema = new banco.Schema({
  título: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  anoPublicação: {
    type: Number,
    required: true
  },
  editora: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true
  },
  preço: {
    type: Number,
    required: true
  }
});

const Livro = banco.model('livros', LivroSchema);

module.exports = Livro;
