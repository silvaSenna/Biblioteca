import {Request,Response} from 'express';


import LivroModel from '../model/Livro.model';
import{Op} from 'sequelize';



abstract class Livros{

constructor(){

}



public async view_Livros(_req: Request, res: Response) {
    



    await res.render('pages/Livro', { title: 'Livros' });

}


public validarCadastro(codigo:string,ident:string){

   return LivroModel.count({

        where:{
            
            
            nome_identificacao:ident,
            codigo:codigo
        }


    }).then((retorno:number)=>retorno);
}

public async cad_CadLivros(req:Request,res:Response){
    


    let [retorno]=await Promise.all([this.validarCadastro(req.body.codigo,req.body.ident)]);

    if(retorno==0){
    
   await LivroModel.create({
          
        titulo:req.body.titulo,
        autor:req.body.autor,
        editora:req.body.editora,
        edicao:req.body.edicao,
        nome_identificacao:req.body.ident,
        codigo:req.body.codigo

    }).then((data:object)=>{
      
        res.json(data);

    });

}else{

    await res.status(404).json('Já existe um livro cadastastrado com o mesmo codigo!');

}
  
   

}

public async ConsultaLivros(req:Request,res:Response){


    let limit=5;

    let q= await req.query.valor;
    let offset= await req.query.pages? limit*(parseInt(req.query.pages)-1): 0 ;
 
    await LivroModel.findAndCountAll({
        where:{[Op.or]:[
            {
                idlivro:{

                [Op.like]:'%'+q+'%'}

            },{
                titulo:{
                    [Op.like]:'%'+q+'%'
                
                }
            },{
                autor:{
                    [Op.like]:'%'+q+'%'
                }

            },{
                 
                editora:{
                    
                    [Op.like]:'%'+q+'%'
                
                }

            },{

              edicao:{[Op.like]:'%'+q+'%'}

            },{
                nome_identificacao:{
                [Op.like]:'%'+q+'%'
                }

            },{

                codigo:{
                    [Op.like]:'%'+q+'%'
                    }

            }
        ]
    },order:[["idlivro","DESC"]],limit:5,offset:offset
}
).then( async (data:any)=>{
   
        let limit=5;
        let pages= await Math.ceil((data.count/limit));
        data.pages= await pages;

        
        await res.json(data);

        
     
    });


    


}


public async excluirLivro(req:Request,res:Response){

    await LivroModel.destroy({where:{
            
         idlivro:req.query.id


    }}).then(async (data:any)=>{
         
        await res.status(200).json(data);

    });

    

    
}


public async ConsultaEditar(req:Request,res:Response){

         await LivroModel.findOne({where:{ idlivro:parseInt(req.query.id)},plain:true}).then(async (data:object)=>{
             
             res.json(data);

          });
    

    
}


public async EditarLivro(req:Request,res:Response){


    await LivroModel.count({


        where:{
            
            nome_identificacao:req.body.ident,
            codigo:req.body.codigo,
            idlivro:{
                
                [Op.ne]:req.body.idlivro

            }
        }



    }).then( async (count:number)=>{

        if(count==0){

        await LivroModel.update({
        
            titulo:req.body.titulo,
            autor:req.body.autor,
            editora:req.body.editora,
            edicao:req.body.edicao,
            nome_identificacao:req.body.ident,
            codigo:req.body.codigo
         },{
             where:{
                 idlivro:req.body.idlivro
                
                }
            }).then((data:number)=>{
    
    
                res.json(data);
    
            });

        }else{

            res.status(404).json('Já existe um livro com esse codigo');
        }


    });

   



}







}

export default Livros;