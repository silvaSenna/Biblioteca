import {Request,Response} from 'express';


import clienteModel from '../model/Cliente.model';
import{Op} from 'sequelize';



abstract class Cliente{

constructor(){

}



public async view_Cliente(_req: Request, res: Response) {
    



    await res.render('pages/Cliente', { title: 'Cliente' });

}

public async clienteCadastro(req:Request,res:Response){

   let [email,cpf]= await Promise.all([this.validarEmail(req.body.email),this.validarCpf(req.body.cpf)]);

   

   if(email>0 && cpf==0){

    await res.status(404).json('Este email já existe cadastrado no sistema!');

   }else if(cpf>0 && email==0){
   
   
    await res.status(404).json('Este cpf já existe cadastrado no sistema!');


   }else if(email>0 &&  cpf>0 ){

    await res.status(404).json('Este email e o cpf já estão cadastrados no sistema!');

   }else{

    clienteModel.create({
         
        nome:req.body.nome,
        telefone:req.body.telefone,
        celular:req.body.celular,
        dataNasc:req.body.data,
        endereco:req.body.endereco,
        email:req.body.email,
        cpf:req.body.cpf,
        cep:req.body.cep,
        bairro:req.body.bairro


    }).then((data:object)=>{


        res.json(data);

    });

   }

   
  

   


}


public  validarEmail(email:string){

   

   return  clienteModel.count({

        where:{

           email:email

        }
    }).then((email:number)=>email);

    

}


public validarCpf(cpf:number){

return clienteModel.count({
    where:{
     
        cpf:cpf

    }
}).then((cpf:number)=>cpf);


}



public async clienteConsulta(req:Request,res:Response){

    let limit=5;

    let q= await req.query.buscar;
    let offset= await req.query.pages? limit*(parseInt(req.query.pages)-1): 0 ;
 
    await clienteModel.findAndCountAll({
        where:{[Op.or]:[
            {
                id_cliente:{

                [Op.like]:'%'+q+'%'}

            },{
                nome:{
                    [Op.like]:'%'+q+'%'
                
                }
            },{
                cpf:{
                    [Op.like]:'%'+q+'%'
                }

            },{
                 
                email:{
                    
                    [Op.like]:'%'+q+'%'
                
                }

            },{
                 
                telefone:{
                    
                    [Op.like]:'%'+q+'%'
                
                }

            }
        ]
    },order:[["id_cliente","DESC"]],limit:5,offset:offset
}
).then( async (data:any)=>{
   
        let limit=5;
        let pages= await Math.ceil((data.count/limit));
        data.pages= await pages;

        
        await res.json(data);

        
     
    });


}


public async excluirCliente(req:Request,res:Response){

   await clienteModel.destroy({
      
        where:{

            id_cliente:req.query.id
        }


    }).then((count:number)=>{


        res.json(count);


    })


}  


public async consultaEditar(req:Request,res:Response){

    await clienteModel.findOne({
      
        where:{

         id_cliente: req.query.id 

        }

      }).then( async (data:object)=>{

          
        await res.json(data);



    });


}


public async editarCliente(req:Request, res:Response){


     let email=await clienteModel.count({ where:{ [Op.or]:{  email:req.body.email  },id_cliente:{  [Op.ne]:req.body.id_cliente  }  } }).then((count:number)=>count);
     let cpf=await clienteModel.count({ where:{ [Op.or]:{  cpf:req.body.cpf  },id_cliente:{  [Op.ne]:req.body.id_cliente  }  } }).then((count:number)=>count);


     if(email!=0 && cpf==0){

       
       await res.status(404).json('Já existe um clinte cadastrado com o mesmo email!');

     }else if(cpf!=0 && email==0){

        await res.status(404).json('Já existe um clinte cadastrado com o mesmo CPF!');

     }else if(cpf!=0 && email!=0){

        await res.status(404).json('Já existe um clinte cadastrado com o mesmo CPF e E-mail!');

     }else{

       await clienteModel.update({
            
            nome:req.body.nome,
            telefone:req.body.telefone,
            celular:req.body.celular,
            dataNasc:req.body.data,
            endereco:req.body.endereco,
            email:req.body.email,
            cpf:req.body.cpf,
            cep:req.body.cep,
            bairro:req.body.bairro
        
        
        }, {
                
                where:{

                   id_cliente:req.body.id_cliente
                }
            
            }
        
        ).then((data:number)=>{


            res.json(data);



        });



     }



}




}

export default Cliente;