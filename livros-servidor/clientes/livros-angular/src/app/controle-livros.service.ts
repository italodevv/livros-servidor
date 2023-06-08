import { Injectable } from '@angular/core';
import { Livro } from './livro';

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  private baseURL = 'http://localhost:4200/Livros';

  async obterLivros(): Promise<Array<Livro>> {
    const response = await fetch(this.baseURL, { method: 'GET' });
    const data = await response.json();
    return data.map((livroMongo: LivroMongo) => this.converterParaLivro(livroMongo));
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = this.converterParaLivroMongo(livro);
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livroMongo)
    });
    return response.ok;
  }

  async excluir(codigo: string): Promise<boolean> {
    const url = `${this.baseURL}/${codigo}`;
    const response = await fetch(url, { method: 'DELETE' });
    return response.ok;
  }

  private converterParaLivro(livroMongo: LivroMongo): Livro {
    return {
      codigo: livroMongo._id || '',
      codEditora: livroMongo.codEditora,
      titulo: livroMongo.titulo,
      resumo: livroMongo.resumo,
      autores: livroMongo.autores
    };
  }

  private converterParaLivroMongo(livro: Livro): LivroMongo {
    return {
      _id: livro.codigo || null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    };
  }
}
