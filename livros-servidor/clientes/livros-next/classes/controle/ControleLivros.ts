import Livro from '../modelo/Livros';

class ControleLivros {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(this.baseURL, {
      method: 'GET',
    });

    const livrosData = await response.json();

    return livrosData.map((livroData: any) => {
      const { codigo, codEditora, titulo, resumo, autores, editora } = livroData;
      return new Livro(codigo, codEditora, titulo, resumo, autores, editora); 
    });
  }

  async excluir(codigo: string): Promise<boolean> {
    const url = `${this.baseURL}/${codigo}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    return response.ok;
  }

  async incluir(livro: Livro): Promise<boolean> {
    const url = this.baseURL;
    const body = JSON.stringify(livro);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    return response.ok;
  }
}

export default ControleLivros;
