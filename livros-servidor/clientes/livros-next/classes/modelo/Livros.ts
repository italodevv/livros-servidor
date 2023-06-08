export default class Livro {
    codigo: number;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
    editora: string;
  
    constructor(
      codigo: number,
      codEditora: number,
      titulo: string,
      resumo: string,
      autores: string[],
      editora: string 
    ) {
      this.codigo = codigo;
      this.codEditora = codEditora;
      this.titulo = titulo;
      this.resumo = resumo;
      this.autores = autores;
      this.editora = editora; 
    }
  }
  