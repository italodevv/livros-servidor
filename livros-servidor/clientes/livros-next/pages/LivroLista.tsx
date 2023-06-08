import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import Livro from '../classes/modelo/Livros';
import ControleLivros from '../classes/controle/ControleLivros';
import { Menu } from '../componentes/Menu';
import LinhaLivro from '../componentes/LinhaLivro';
import Head from 'next/head';

const controleLivros = new ControleLivros('/api/livros');

const LivroLista: NextPage = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  const obterLivros = async (): Promise<Livro[]> => {
    return await controleLivros.obterLivros();
  };

  const excluirLivro = async (codigo: number): Promise<void> => {
    setCarregado(false);
    const success = await controleLivros.excluir(codigo.toString());
    if (success) {
      setLivros(await obterLivros());
      setCarregado(true);
    } else {
      console.error(`Erro ao excluir o livro ${codigo}`);
    }
  };

  useEffect(() => {
    const carregaLivros = async (): Promise<void> => {
      setLivros(await obterLivros());
      setTimeout(() => {
        setCarregado(true);
      }, 200);
    };

    carregaLivros();
  }, []);

  return (
    <div className={styles.conteiner}>
      <Head>
        <title>Loja Next | Catálogo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Menu />
      <main className="container">
        {!carregado && (
          <div className={styles.load}>
            <div className={styles.load_box}>
              <div className={styles.load_box_circle}></div>
              <p className={styles.load_box_title}>Aguarde, carregando...</p>
            </div>
          </div>
        )}
        <h1>Catálogo de Livros</h1>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Titulo</th>
              <th scope="col">Resumo</th>
              <th scope="col">Editora</th>
              <th scope="col">Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro key={index} livro={livro} excluir={excluirLivro} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
