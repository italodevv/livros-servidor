import Livro from "../modelo/Livros";

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

export default class ControleLivros {
  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(baseURL);
    const livrosMongo: LivroMongo[] = await response.json();
    return livrosMongo.map((livroMongo) => ({
      codigo: livroMongo._id ?? "",
      codEditora: livroMongo.codEditora,
      titulo: livroMongo.titulo,
      resumo: livroMongo.resumo,
      autores: livroMongo.autores,
    }));
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };

    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livroMongo),
    });

    return response.ok;
  }

  async excluir(codigo: string): Promise<boolean> {
    const url = `${baseURL}/${codigo}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    return response.ok;
  }
}
