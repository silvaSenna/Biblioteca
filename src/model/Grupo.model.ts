import conexao from '../controller/conexao';
import {Model,DataTypes} from 'sequelize';


class Grupo extends Model{
       
    public id_group!:number;
    public nome_group!:string;
    


}


Grupo.init({

    id_group:{
       type:new DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true


    },nome_group:{

        type:new DataTypes.STRING(100)
    }

},{


    tableName:"grupo",
    modelName:"Grupo",
    timestamps:false,
    sequelize:conexao,
    freezeTableName:true

});



export default Grupo;