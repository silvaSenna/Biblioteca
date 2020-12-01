import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import session from 'express-session';
import rotas from './router/home';
import rotasLivro from './router/livro';
import rotasUsuario from './router/usuario';
import rotasCliente from './router/cliente';
import rotasEmprestimo from './router/emprestimo';
import gzip from 'compression';

import PermissaoFilter from './controller/permissao';



class App extends PermissaoFilter{


    public express:express.Application;

    constructor(){
         super();
        this.express=express();
        this.configuracao();
        this.listen();
    }

    configuracao():void{

      this.express.use(helmet());
      this.express.use(gzip());
      this.express.use(express.static(__dirname+'/view'));
      this.express.set('view engine','ejs');
      this.express.set('views',__dirname+'/view');
      this.express.use(bodyParser.json());
      this.express.use(bodyParser.urlencoded({extended:false}));
      this.express.use(session({secret:'teste', resave: false,saveUninitialized: true}));
      this.express.use('/app/*',(req,res,next)=>this.filterAPP(req,res,next));
      this.express.use(rotas);
      this.express.use('/app',rotasLivro);
      this.express.use('/app',rotasUsuario);
      this.express.use('/app',rotasCliente);
      this.express.use('/app',rotasEmprestimo);



    }


    listen():void{

        this.express.listen(3000,()=>{

            console.log('Backend funcionando!');
        });
    }




}

export default new App();