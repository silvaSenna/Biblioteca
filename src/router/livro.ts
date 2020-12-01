import { Router } from 'express';

import Livros from '../controller/Livro.controller';


class Rotas extends Livros {


    public rota: Router;
    

    constructor() {


        super();


        this.rota = Router();

       

      
        this.rota.get('/livro/consulta',(req,res)=>this.ConsultaLivros(req,res));
        this.rota.delete('/livro/excluir',(req,res)=>this.excluirLivro(req,res));
        this.rota.get('/livro/view', (req, res) => this.view_Livros(req, res));
        this.rota.get('/livro/ConsultaEditar',(req,res) => this.ConsultaEditar(req,res));
        this.rota.put('/livro/editar',(req,res) => this.EditarLivro(req,res));
        this.rota.post('/livro/livrocad',(req,res)=>this.cad_CadLivros(req,res));


    }



    






}

export default new Rotas().rota;