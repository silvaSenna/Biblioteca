import { Router } from 'express';

import Usuario from '../controller/usuario.controller';


class Rotas extends Usuario {


    public rota: Router;
    

    constructor() {

        super();

        this.rota = Router();

        this.rota.get('/usuario/view',(req,res)=>this.view_usuario(req,res));
        this.rota.get('/usuario/consulta',(req,res)=>this.ConsultarUsuarios(req,res));
        this.rota.post('/usuario/cadastro',(req,res)=>this.cadastroUsuario(req,res));
        this.rota.delete('/usuario/excluir',(req,res)=>this.excluirUsuario(req,res));
        this.rota.get('/usuario/consultaEditar',(req,res)=>this.consultaEditar(req,res));
        this.rota.put('/usuario/editar',(req,res)=>this.editarUsuario(req,res));
        this.rota.get('/usuario/validarCampUnique',(req,res)=>this.validarCampUnique(req,res));




    }



    






}

export default new Rotas().rota;