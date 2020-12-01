
import conexao from '../controller/conexao';

import {Model, DataTypes} from 'sequelize';
import Emprestimo from './Emprestimo.model';


class LivroStatus extends Model {

    public idStatus!:number;
    public idlivro!:number;
    public idEmprestimo!:number;
    public status!:boolean;
    

}


  LivroStatus.init({

    idStatus:{
       type: new DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true,
    },
    idlivro:{

        type: new DataTypes.INTEGER,
        
    },idEmprestimo:{

        type:new DataTypes.INTEGER,
        references:{
             
            model:'Emprestimo',
            key:'id_emp'

        }
    },status:{

        type: DataTypes.BOOLEAN,
        
    }

},{ 
    tableName:"livroStatus",
    modelName:"LivroStatus",
    timestamps:false,
    sequelize:conexao

});

LivroStatus.hasOne(Emprestimo,{foreignKey:"id_emp",foreignKeyConstraint:true,sourceKey:'idEmprestimo'});




export default  LivroStatus;