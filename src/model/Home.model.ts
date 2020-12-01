
import conexao from '../controller/conexao';

import {Model, DataTypes} from 'sequelize';
import Usuario from './Usuario.model';

class Home extends Model {

    public id!:number;
    public login!:string;
    public senha!:string;
    public user!:number;

}


   Home.init({

    id:{
       type: new DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true,
    },
    login:{

        type: new DataTypes.STRING(100)
    },senha:{

        type:new DataTypes.STRING(100)
    },user:{

        type:new DataTypes.INTEGER,
        references:{

            model:'Usuario',
            key:'id_user'
        }
    }

},{ 
    tableName:"login",
    modelName:"home",
    timestamps:false,
    sequelize:conexao

});

Home.hasOne(Usuario,{foreignKey:"id_user",foreignKeyConstraint:true,sourceKey:'user'});



export default  Home;