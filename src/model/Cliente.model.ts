import conexao from '../controller/conexao';
import {Model,DataTypes} from 'sequelize';


class Cliente extends Model{
       
    public id_cliente!:number;
    public nome!:string;
    public telefone!:string;
    public celular!:string;
    public dataNasc!:Date;
    public endereco!:string;
    public email!:string;
    public cpf!:string;
    public cep!:string;
    public bairro!:string;
    


}


Cliente.init({

    id_cliente:{
       type:new DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true


    },nome:{

        type:new DataTypes.STRING(100)
    },telefone:{

        type:new DataTypes.STRING(100)
    },celular:{

        type:new DataTypes.STRING(20)
    },dataNasc:{

        type: new DataTypes.DATE
    },endereco:{
        
        type: new DataTypes.STRING(100)
    },email:{

        type: new DataTypes.STRING(100)
    },cpf:{

        type:new DataTypes.STRING(20)

    },cep:{

        type:new DataTypes.STRING(20)
    },bairro:{

        type:new DataTypes.STRING(50)
    }

},{


    tableName:"cliente",
    modelName:"Cliente",
    timestamps:false,
    sequelize:conexao,
    

});


export default Cliente;