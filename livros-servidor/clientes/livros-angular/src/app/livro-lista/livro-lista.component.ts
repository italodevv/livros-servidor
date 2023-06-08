import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  livros: Livro[] = [];

  constructor(private controleLivrosService: ControleLivrosService) {}

  ngOnInit(): void {
    this.controleLivrosService.obterLivros().then((livros) => {
      this.livros = livros;
    });
  }

  excluir(codigo: string): void {
    this.controleLivrosService.excluir(codigo).then(() => {
      this.controleLivrosService.obterLivros().then((livros) => {
        this.livros = livros;
      });
    });
  }
}
