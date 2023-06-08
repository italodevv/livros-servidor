import React, { useState, useEffect } from 'react';
import LinhaLivro from './LinhaLivro';
import ControleLivros from './controle/ControleLivros';

const controleLivros = new ControleLivros();

function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    controleLivros.obterTodos()
      .then((resultado) => {
        setLivros(resultado);
        setCarregado(true);
      });
  }, []);

  const excluir = (codigo) => {
    controleLivros.excluir(codigo)
      .then(() => {
        setCarregado(false);
      });
  };

  return (
    <div>
      {carregado ? (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Resumo</th>
              <th>Autores</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro
                key={index}
                codigo={livro.codigo.toString()}
                titulo={livro.titulo}
                resumo={livro.resumo}
                autores={livro.autores.join(', ')}
                excluir={excluir}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
}

export default LivroLista;
