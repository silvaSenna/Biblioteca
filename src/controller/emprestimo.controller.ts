import {Request,Response} from 'express';

import livroModel from '../model/Livro.model';
import clienteModel from '../model/Cliente.model';
import LivroStatusModel from '../model/LivroStatus.model';
import EmprestimoModel from '../model/Emprestimo.model';
import LivroModel from '../model/Livro.model';
import UsuarioModel from '../model/Usuario.model';

import{Op} from 'sequelize';
import Seq from '../controller/conexao';



abstract class Emprestimo{

constructor(){

}



public async view_Emprestimo(_req: Request, res: Response) {
    



    await res.render('pages/Emprestimo', { title: 'Emprestimo' });

}

public async emprestimoCadastro(req:Request,res:Response){

    let disponivel=await LivroStatusModel.count({ where:{idlivro:req.body.idlivro,status:true}}).then((data:object)=>data);

    if(disponivel==0){

    EmprestimoModel.create({

      id_user:req!.session!.user.user,
      id_livro:req.body.idlivro,
      cliente:req.body.idCliente,
      dataEmprestimo:req.body.dataEmp,
      dataDevolucao:req.body.dataDev


    }).then((data:any)=>{

        LivroStatusModel.create({

            idlivro:data.id_livro,

            idEmprestimo:data.id_emp,
            
            status:true

        }).then((data:object)=>{

              
            res.json(data);

        });



    });

     

    }else{

     res.status(404).json('Este livro já se encontra emprestado!');

    }


   


}






public async emprestimoConsulta(req:Request,res:Response){

    let limit=5;

    let q= await req.query.buscar;
    let offset= await req.query.pages? limit*(parseInt(req.query.pages)-1): 0 ;
 
    await LivroStatusModel.findAndCountAll({

        include:[{model:EmprestimoModel,required:true, as:"Emprestimo",include:[{model:LivroModel,required:true,as:"Livro",attributes:["titulo"]},
            {model:UsuarioModel,required:true,as:"Usuario",attributes:["nome"]},{model:clienteModel,required:true,as:"Cliente",attributes:["nome","cpf"]}]}],

        where:{[Op.or]:
            {
               '$Emprestimo->Usuario.nome$':{

                [Op.like]:'%'+q+'%'
            
            },'$Emprestimo->Cliente.cpf$':{

                [Op.like]:'%'+q+'%'

            },'$Emprestimo->Cliente.nome$':{

                [Op.like]:'%'+q+'%'
            },'$Emprestimo.dataEmprestimo$':{

                [Op.like]:'%'+q+'%'
            },'$Emprestimo.dataDevolucao$':{

                [Op.like]:'%'+q+'%'
            }

            }
        
    },order:[["idEmprestimo","DESC"]],limit:5,offset:offset
}
).then( async (data:any)=>{
   
        let limit=5;
        let pages= await Math.ceil((data.count/limit));
        data.pages= await pages;

        
        await res.json(data);

        
     
    });


}


public async excluirEmprestimo(req:Request,res:Response){


    let validar= await LivroStatusModel.count({ where:{ idEmprestimo:req.query.id, status:false }}).then((data:number)=>data);

 
    if(validar!=0){

   await LivroStatusModel.destroy({
      
        where:{

            idEmprestimo: req.query.id
        }


    }).then(()=>{


       EmprestimoModel.destroy({
         
        where:{
        
            
            id_emp:req.query.id

        }

       }).then((data:number)=>{

          res.json(data);

       });


    });
   }else{
     
    res.status(404).json('Este emprestimo não poder ser excluido devido ao status!');

   }

}  


public async consultaEditar(req:Request,res:Response){

   await LivroStatusModel.findOne({

    include:[{model:EmprestimoModel,required:true, as:"Emprestimo",include:[{model:LivroModel,required:true,as:"Livro"},
    {model:UsuarioModel,required:true,as:"Usuario"},{model:clienteModel,required:true,as:"Cliente"}]}],
    where:{


        '$Emprestimo.id_emp$':req.query.id

    }


   }).then((data:object)=>{

      
    res.json(data);

   });


}


public async editarEmprestimo(req:Request,res:Response){
    
    let livroNovo=await Seq.query('select exists(select 1 from livroStatus where idlivro=:idlivro and status=true) as livroNovo',{plain:true,replacements:{'idlivro':req.body.idlivro}}).then((data:object)=>data);
    
    let livroAtual=await Seq.query('select exists(select 1 from livroStatus where idlivro=:idlivro and status=true and idEmprestimo=:idEmp) as livroAtual',{plain:true,replacements:{'idlivro':req.body.idlivro,'idEmp':req.body.idEmp}}).then((data:object)=>data);
    
   if(livroNovo.livroNovo==0 || livroAtual.livroAtual==1){
     
    EmprestimoModel.update({

        id_livro:req.body.idlivro,
        cliente:req.body.idCliente,
        dataEmprestimo:req.body.dataEmp,
        dataDevolucao:req.body.dataDev

       },{
    
        where:{
            
            id_emp:req.body.idEmp

    }

    }).then(()=>{
       
        LivroStatusModel.update({
          idlivro:req.body.idlivro,
          status:true

        },{
            where:{
           
                idEmprestimo:req.body.idEmp

        }
        
        }).then((data:number)=>{
           
            res.json(data);

        });

    });

   }else{
    res.status(404).json('Este livro já se encontra emprestado!');

   }

}


public async cosultaCliente(req:Request,res:Response){


    clienteModel.findOne({

     where:{

        cpf:req.query.cpf
     }


    }).then((data:object)=>{


        if(data!=null){
         
            res.json(data);

        }else{

            res.status(404).json('Cliente não encontrado no sistema!');

        }

       

    })


}


public async cosultaLivro(req:Request,res:Response){


    livroModel.findOne({

     where:{

        nome_identificacao :req.query.ident,
        codigo:req.query.codigo
     }


    }).then((data:object)=>{


        if(data!=null){
         
            res.json(data);

        }else{

            res.status(404).json('Livro não encontrado no sistema!');

        }

       

    });


}


public async finalizarEmprestimo(req:Request,res:Response){

    let data=new Date();

    LivroStatusModel.update({

        status:false

    },{
        where:{
         
         idEmprestimo:req.query.id

        }

    }).then(()=>{

            EmprestimoModel.update({

              dataDevolucao:data

            },{

                where:{

                    id_emp:req.query.id

            }

        }).then((data:number)=>{

           res.json(data);


        });

    });



}




}

export default Emprestimo;