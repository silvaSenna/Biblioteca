
import conexao from '../controller/conexao';

import {Model, DataTypes} from 'sequelize';
import Usuario from './Usuario.model';
import Livro from './Livro.model';
import Cliente from './Cliente.model';

class Emprestimo extends Model {

    public id_emp!:number;
    public id_user!:number;
    public id_livro!:number;
    public cliente!:number;
    public dataEmprestimo!:Date;
    public dataDevolucao!:Date;

}


   Emprestimo.init({

    id_emp:{
       type: new DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true,
    },
    id_user:{

        type: new DataTypes.INTEGER,
        references:{
            model:'Usuario',
            key:'id_user'
        }
    },id_livro:{

        type:new DataTypes.INTEGER,
        references:{
             
            model:'Livro',
            key:'idlivro'

        }
    },cliente:{

        type:new DataTypes.INTEGER,
        references:{

            model:'Cliente',
            key:'id_cliente'
        }
    },dataEmprestimo:{

     type:new DataTypes.DATE

    },dataDevolucao:{

        type:new DataTypes.DATE
    }

},{ 
    tableName:"emprestimo",
    modelName:"Emprestimo",
    timestamps:false,
    sequelize:conexao

});

Emprestimo.hasOne(Usuario,{foreignKey:"id_user",foreignKeyConstraint:true,sourceKey:'id_user'});

Emprestimo.hasOne(Livro,{foreignKey:"idlivro",foreignKeyConstraint:true,sourceKey:'id_livro'});

Emprestimo.hasOne(Cliente,{foreignKey:"id_cliente",foreignKeyConstraint:true,sourceKey:'cliente'});



export default  Emprestimo;