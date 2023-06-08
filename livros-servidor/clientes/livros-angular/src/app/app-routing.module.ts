import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroListaComponent } from './livro-lista/livro-lista.component';
import { LivroDadosComponent } from './livro-dados/livro-dados.component';

const routes: Routes = [
  { path: '', redirectTo: '/lista', pathMatch: 'full' }, // Rota padrão apontando para "lista"
  { path: 'lista', component: LivroListaComponent }, // Rota "lista" apontando para LivroListaComponent
  { path: 'dados', component: LivroDadosComponent } // Rota "dados" apontando para LivroDadosComponent com parâmetro "codigo"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
