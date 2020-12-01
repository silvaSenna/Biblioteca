import { Router } from 'express';

import Cliente from '../controller/cliente.controller';


class Rotas extends Cliente {


    public rota: Router;
    

    constructor() {


        super();


        this.rota = Router();

        this.rota.get('/cliente/view', (req, res) => this.view_Cliente(req, res));
        this.rota.post('/cliente/cadastro',(req,res)=> this.clienteCadastro(req,res));

        this.rota.get('/cliente/consulta',(req,res)=>this.clienteConsulta(req,res));
        this.rota.get('/cliente/consultaEditar',(req,res)=>this.consultaEditar(req,res));

        this.rota.delete('/cliente/excluir',(req,res)=>this.excluirCliente(req,res));

        this.rota.put('/cliente/editar',(req,res)=>this.editarCliente(req,res));

      


    }



    






}

export default new Rotas().rota;