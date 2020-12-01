import conexao from '../controller/conexao';
import {Model,DataTypes} from 'sequelize';
import Grupo from './Grupo.model';

class Usuario extends Model{
       
    public id_user!:number;
    public nome!:string;
    public telefone!:string;
    public celular!:string;
    public dataNasc!:Date;
    public endereco!:string;
    public email!:string;
    public grupo!:number;


}


Usuario.init({

    id_user:{
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
    },grupo:{

        type:new DataTypes.INTEGER,

        references:{

            model:'Grupo',
            key:'id_group'
        }
    }

},{


    tableName:"usuario",
    modelName:"Usuario",
    timestamps:false,
    sequelize:conexao,
    freezeTableName:true

});

Usuario.hasOne(Grupo,{foreignKey:"id_group",foreignKeyConstraint:true,sourceKey:'grupo'});

export default Usuario;