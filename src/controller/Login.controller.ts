import {Request,Response} from 'express';


import crypto from 'crypto';
//import Sequelize from './conexao';
import Permissao from '../model/permissao.model';

import Home from '../model/Home.model';
import Usuario from '../model/Usuario.model';



 abstract class Login{


   public login:string;
   public senha:string;
   public title:string;

    constructor(){
        
        this.login='';
        this.senha='';

        this.title="Login";
      

    }

   async Login(req:Request,res:Response){


          
        this.login= await req.body.login;
        this.senha=await crypto.createHash("md5").update( req.body.senha).digest("hex");

        if(this.login==null && this.senha==null)  res.render('login',{title:this.title,erro:'Login ou senha invalidos!'});
           
        await Home.findOne({include:[{model:Usuario,required:true,attributes:['nome','grupo']}],attributes:['id','login','user'],where:{login:this.login,senha:this.senha} }).then( async (row:object)=>{
            
            
            

           if(row){
              
                 req!.session!.user= await row;
                

                await res.redirect('/app/emprestimo/view');

            }else{

               await res.render('login',{title:this.title,erro:'Login ou senha invalidos!'});
            }
            
         });
         
        }
        
        

        public async index(req: Request, res: Response) {


            if(req!.session!.user){

               res.redirect('/app/emprestimo/view');

            }else{

            await res.render('login', { title: 'Login', erro: '' });
            }
      
      
         }
        
         public async Home(req:Request,res:Response){
          
            if(!req!.session!.user){
                  
               res.redirect('/'); 
         
                }else{
      
              res.render('pages/home', { title: 'Home' });
      
            }
      
         }
      
         public async sair(req:Request,res:Response){
      
      
            await req!.session!.destroy(function(err){
      
                 if(err) throw console.log(err);
            });
      
           await  res.redirect('/');
         }


         public async permissao(req:Request,res:Response){

            let path=req.query.path;

            

            if(req!.session!.user){

               Permissao.findOne({
                  
                  where:{
                   
                     grupo:req!.session!.user.grupo,
                     interface:path

               },attributes:['ver','editar','excluir','gravar'],plain:true
            }).then((data:object)=>{

               res.json(data);
            });
               
               

            }else{

               res.status(400).send("Não existe session");

            }


         }
      
 
        


    }








export default  Login;