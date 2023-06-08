const express = require('express');
const Livro = require('../modelo/livro-dao');

const router = express.Router();

// Rota para obter todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.obterLivros();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter livros' });
  }
});

// Rota para incluir um novo livro
router.post('/', async (req, res) => {
  try {
    const novoLivro = await Livro.incluir(req.body);
    res.json({ message: 'Livro incluído com sucesso', livro: novoLivro });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao incluir livro' });
  }
});

// Rota para excluir um livro pelo código (_id)
router.delete('/:codigo', async (req, res) => {
  const { codigo } = req.params;
  try {
    const resultado = await Livro.excluir(codigo);
    if (resultado.deletedCount > 0) {
      res.json({ message: 'Livro excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir livro' });
  }
});

module.exports = router;
