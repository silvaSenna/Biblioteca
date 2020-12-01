import { Router} from 'express';

import Login from '../controller/Login.controller';


class Rotas extends Login{


   public rota: Router;
   

   constructor() {
     
      super();


      this.rota = Router();


      this.rota.get('', (req, res) => this.index(req, res));
      this.rota.post('', (req, res) => this.Login(req, res));
      /*this.rota.get('/app/home/home', (req, res) => this.Home(req,res));*/
      this.rota.get('/app/home/permissao',(req,res)=>this.permissao(req,res));
      this.rota.get('/Sair',(req,res)=>this.sair(req,res));


      


   }





}

export default new Rotas().rota;