import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../livro';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  livro: Livro = {
    codigo: '',
    codEditora: 0,
    titulo: '',
    resumo: '',
    autores: []
  };

  constructor(
    private router: Router,
    private controleLivrosService: ControleLivrosService
  ) {}

  ngOnInit(): void {}

  incluir(): void {
    this.controleLivrosService.incluir(this.livro).then(() => {
      this.router.navigateByUrl('/lista');
    });
  }
}
