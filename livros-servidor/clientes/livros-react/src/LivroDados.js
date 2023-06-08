import React, { useState } from 'react';
import { navigate } from '@reach/router';
import ControleLivros from './controle/ControleLivros';

const controleLivros = new ControleLivros();

function LivroDados() {
  const [livro, setLivro] = useState({
    codigo: '',
    codEditora: '',
    titulo: '',
    resumo: '',
    autores: [],
  });

  const atualizarCampo = (campo, valor) => {
    setLivro({ ...livro, [campo]: valor });
  };

  const incluir = () => {
    controleLivros.incluir(livro)
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div>
      <h2>Dados do Livro</h2>
      <div>
        <label>
          Código:
          <input
            type="text"
            value={livro.codigo}
            onChange={(e) => atualizarCampo('codigo', e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Código da Editora:
          <input
            type="text"
            value={livro.codEditora}
            onChange={(e) => atualizarCampo('codEditora', e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Título:
          <input
            type="text"
            value={livro.titulo}
            onChange={(e) => atualizarCampo('titulo', e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Resumo:
          <textarea
            value={livro.resumo}
            onChange={(e) => atualizarCampo('resumo', e.target.value)}
          ></textarea>
        </label>
      </div>
      <div>
        <label>
          Autores:
          <input
            type="text"
            value={livro.autores.join(', ')}
            onChange={(e) => atualizarCampo('autores', e.target.value.split(','))}
          />
        </label>
      </div>
      <button onClick={incluir}>Incluir</button>
    </div>
  );
}

export default LivroDados;
