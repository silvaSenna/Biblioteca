
import conexao from '../controller/conexao';

import {Model, DataTypes} from 'sequelize';


class Permissao extends Model {

    public id_permiss!:number;
    public grupo!:number;
    public ver!:boolean;
    public editar!:boolean;
    public gravar!:boolean;
    public excluir!:boolean;
}


   Permissao.init({

    id_permiss:{
       type: new DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true,
    },
    grupo:{

        type: new DataTypes.INTEGER,
        references:{
          key:'id_group',
          model:'Grupo'

        }
    },interface:{

        type:new DataTypes.STRING(40)
        
    },ver:{

        type: DataTypes.BOOLEAN
    },editar:{

        type: DataTypes.BOOLEAN
    },gravar:{

        type: DataTypes.BOOLEAN
    },excluir:{
        type: DataTypes.BOOLEAN
    }

},{ 
    tableName:"permissao",
    modelName:"Permissao",
    timestamps:false,
    sequelize:conexao

});





export default  Permissao;