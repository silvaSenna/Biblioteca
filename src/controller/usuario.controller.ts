import { Request, Response } from 'express';
import { Op } from 'sequelize';
//import Sequelize from 'sequelize';
import crypto from 'crypto';

import UsuarioModel from '../model/Usuario.model';
import Home from '../model/Home.model';
import Grupo from '../model/Grupo.model';










abstract class Usuario {


    constructor() {


    }


    public async view_usuario(_req: Request, res: Response) {

        res.render('pages/Usuario', { title: 'Usuários' });


    }


    public async ConsultarUsuarios(req: Request, res: Response) {


        let limit = 5;

        let q = await req.query.buscar;
        let offset = await req.query.pages ? limit * (parseInt(req.query.pages) - 1) : 0;

        await Home.findAndCountAll({
            include: [{
                model: UsuarioModel,
                required: true,
                include: [{ model: Grupo, required: true, as: 'Grupo', attributes: ['nome_group'] }], attributes: ['id_user', 'nome', 'email']

            }], attributes: ['id', 'login'],

            where: {

                [Op.or]: {

                    '$Usuario.nome$': {
                        [Op.like]: '%' + q + '%'
                    }, login: {

                        [Op.like]: '%' + q + '%'
                    }, '$Usuario.email$': {

                        [Op.like]: '%' + q + '%'
                    }, '$Usuario->Grupo.nome_group$': {

                        [Op.like]: '%' + q + '%'
                    }

                }
            }, limit: limit, offset: offset



        }).then(async (data: any) => {

            let limit = 5;
            let pages = await Math.ceil((data.count / limit));
            data.pages = await pages;

            await res.json(data);

        });





    }


    public async cadastroUsuario(req: Request, res: Response) {


        await Home.count({

            include: [{ model: UsuarioModel, required: true }],

            where: {

                [Op.or]: {

                    '$Usuario.email$': req.body.email,
                    login: req.body.login


                }


            }


        }).then(async (data: number) => {

            if (data == 0) {



                await UsuarioModel.create({

                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    celular: req.body.celular,
                    dataNasc: req.body.data,
                    email: req.body.email,
                    endereco: req.body.endereco,
                    grupo: req.body.grupo



                }).then(async (data: any) => {


                    await Home.create({

                        login: req.body.login,
                        senha: crypto.createHash("md5").update(req.body.senha).digest("hex"),
                        user: data.id_user

                    }).then(() => {

                        res.status(200).json('Cadastrado com sucesso!');

                    });



                });



            } else {


                res.status(404).json("Esses dados já existem cadastrados no sistema!");

            }



        });




    }


    public async excluirUsuario(req: Request, res: Response) {

        await Home.destroy({
            where: {

                user: req.query.id


            }
        }).then(async () => {

            await UsuarioModel.destroy({
                where: {

                    id_user: req.query.id

                }

            }).then((data: number) => {

                res.json(data);

            });

        });




    }

    public async consultaEditar(req: Request, res: Response) {

        Home.findOne({

            include: [{
                model: UsuarioModel,
                required: true,
                include: [{ model: Grupo, required: true, as: 'Grupo' }]

            }],
            where: {

                user: req.query.id

            }

        }).then((data: object) => {


            res.json(data);

        });


    }

    public async editarUsuario(req: Request, res: Response) {


       
        


              await  UsuarioModel.update({

                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    celular: req.body.celular,
                    endereco: req.body.endereco,
                    dataNasc: req.body.data,
                    email: req.body.email,
                    grupo: req.body.grupo


                }, {
                    where: {

                        id_user: req.body.id

                    }
                    }).then( async () => {

                       await Home.update({
                            login: req.body.login,
                            senha: req.body.senha

                        }, {
                            where: {

                                user: req.body.id

                            }
                            }).then((data: number) => {


                                res.json(data);
                            }).catch(()=>{

                                res.status(402).json("Login já existe cadastrado!");
                            });


                    }).catch(()=>{

                       res.status(402).json("E-mail já existe cadastrado!");

                    });


           

        


    }


    public async validarCampUnique(req:Request,res:Response){

             if(req.query.login){

             Home.count({


                where:{
                 
                    login:req.query.login

                }


             }).then((data:number)=>{

                res.json(data);
             });

            }else{

                UsuarioModel.count({

                    where:{
                 
                        email:req.query.email
    
                    }

                }).then((data:number)=>{

                    res.json(data);

                });

                

            }

    }





}








export default Usuario;