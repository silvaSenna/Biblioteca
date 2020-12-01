
import conexao from '../controller/conexao';

import {Model, DataTypes} from 'sequelize';


class LivroModel extends Model {

    public idlivro!:number;
    
    
    public titulo!:string;
    public autor!:string;
    
    public edicao!:string;
    public editora!:string;
    public nome_identificacao!:string;
    public codigo!:string;

}


   LivroModel.init({

    idlivro:{
       type: new DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true,
    },
    titulo:{

        type: new DataTypes.STRING(100)
    },autor:{

        type:new DataTypes.STRING(50)
    },editora:{

        type:new DataTypes.STRING(50)
    },edicao:{
        
        type:new DataTypes.STRING(45)
    
    },nome_identificacao:{

        type:new DataTypes.STRING(20)
    },codigo:{

        type:new DataTypes.STRING(27),
        
    }


},{ 
    tableName:"livro",
    modelName:"Livro",
    timestamps:false,
    sequelize:conexao

});





export default  LivroModel;