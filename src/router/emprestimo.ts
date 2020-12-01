import { Router } from 'express';

import Emprestimo from '../controller/emprestimo.controller';


class Rotas extends Emprestimo {


    public rota: Router;
    

    constructor() {


        super();


        this.rota = Router();

        this.rota.get('/emprestimo/view', (req, res) => this.view_Emprestimo(req, res));
        this.rota.post('/emprestimo/cadastro',(req,res)=> this.emprestimoCadastro(req,res));

        this.rota.get('/emprestimo/consulta',(req,res)=>this.emprestimoConsulta(req,res));
        this.rota.get('/emprestimo/finalizarEmprestimo',(req,res)=>this.finalizarEmprestimo(req,res));
        this.rota.get('/emprestimo/consultaCliente',(req,res)=>this.cosultaCliente(req,res));
        this.rota.get('/emprestimo/consultaLivro',(req,res)=>this.cosultaLivro(req,res));

        this.rota.get('/emprestimo/consultaEditar',(req,res)=>this.consultaEditar(req,res));

        this.rota.delete('/emprestimo/excluir',(req,res)=>this.excluirEmprestimo(req,res));

        this.rota.put('/emprestimo/editar',(req,res)=>this.editarEmprestimo(req,res));

      


    }



    






}

export default new Rotas().rota;