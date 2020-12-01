import {Request,Response,NextFunction} from 'express';
import Permissao from '../model/permissao.model';

class PermissaoFilter{


    public async filterAPP(req:Request,res:Response,next:NextFunction){

        if(req!.session!.user){

            let path=await req.originalUrl;

            let url= await path.replace(/\/[\d]/,""); 
            let urlPath= await url.replace(/\?.*$/,"");
            

            Permissao.findOne({where:{grupo:req!.session!.user.Usuario.grupo,interface:urlPath},attributes:['ver','editar','excluir','gravar'],plain:true
             }).then(async (data:any)=>{

                
               if(req.method=='GET' && data.get('ver')==false){

                   await res.status(400).render('pages/erro_ver',{title:'teste'});

               }else if(req.method=='POST' && data.get('gravar')==false){

                   await res.status(400).json('Permissão Negada!');

               }else if(req.method=="PUT" && data.get('editar')==false){
               
                await res.status(400).json('Permissão Negada!');
               
             } else if(req.method=="DELETE" && data.get('excluir')==false){
             
                await res.status(400).json('Permissão Negada!');
             
            }else{
 
                  await next();
               }

              }).catch(async()=>{

                await res.status(400).json('Permissão Negada!');
              });
        
          

         }else{

            await res.redirect('/');
         }



    }


}

export default PermissaoFilter;