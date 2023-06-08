import { NextPage } from 'next';
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Livro from '../classes/modelo/Livros';
import ControleLivros from '../classes/controle/ControleLivros';
import { Menu } from '../componentes/Menu';
import Head from 'next/head';

const controleLivros = new ControleLivros('mongodb://localhost:27017');

const LivroDados: NextPage = () => {
  const [livro, setLivro] = useState<Livro>(new Livro(0, 0, '', '', [], ''));
  const router = useRouter();

  const incluirLivro = (): void => {
    controleLivros
      .incluir(livro)
      .then(() => {
        router.push('/LivroLista');
      })
      .catch((error) => {
        console.error('Erro ao incluir o livro:', error);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setLivro((livro) => ({ ...livro, [name]: value }));
  };

  return (
    <div>
      <Head>
        <title>Loja Next | Dados do Livro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Menu />
      <main className="container">
        <h1>Dados do Livro</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              name="titulo"
              value={livro.titulo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">
              Resumo
            </label>
            <textarea
              className="form-control"
              id="resumo"
              name="resumo"
              value={livro.resumo}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="editora" className="form-label">
              Editora
            </label>
            <input
              type="text"
              className="form-control"
              id="editora"
              name="editora"
              value={livro.editora}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">
              Autores
            </label>
            <input
              type="text"
              className="form-control"
              id="autores"
              name="autores"
              value={livro.autores.join(', ')}
              onChange={handleChange}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={incluirLivro}>
            Incluir
          </button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
