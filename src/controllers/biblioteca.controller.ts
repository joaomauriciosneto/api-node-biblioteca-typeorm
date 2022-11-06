import { Request, Response } from "express";
import { bibliotecaRepositorio } from "../repositories/biblioteca.repositorio";
import { livroRepositorio } from "../repositories/livro.repositorio";

export class BibliotecaController {

    async criarBiblioteca(req: Request, res: Response) {

        try {

            const {nome, url} = req.body;

            if(!nome) {
                return res.status(400).send({
                    ok: false,
                    message: 'Digite o campo nome!'
                })
            }

            if(!url) {
                return res.status(400).send({
                    ok: false,
                    message: 'Preencha o campo url!'
                })
            }

            const retornoBiblioteca = await bibliotecaRepositorio.find({
                where: {
                    nome: nome,
                    url: url
                }
            })

            if(retornoBiblioteca.length > 0) {
                return res.status(400).send({
                    ok: false,
                    message: 'Biblioteca já cadastrada no sistema!'
                })
            }

            const novaBiblioteca = bibliotecaRepositorio.create({
                nome,
                url
            });

            await bibliotecaRepositorio.save(novaBiblioteca);

            return res.status(201).send({
                ok: true,
                message: 'Biblioteca cadastrada com sucesso!',
                data: novaBiblioteca
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async listarBibliotecas(req: Request, res: Response) {

        try {

            const {nome} = req.query;

            let biblioteca = await bibliotecaRepositorio.find();

            if(biblioteca == null || biblioteca.length == 0) {
                return res.status(400).send({
                    ok: false,
                    message: 'Sem bibliotecas cadastradas!'
                })
            };

            if(nome) {
                biblioteca = biblioteca.filter(biblioteca => biblioteca.nome.toUpperCase() == nome.toString().toUpperCase());
            }

            return res.status(200).send({
                ok: true,
                message: 'Listagem de todas as bibliotecas!',
                data: biblioteca
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async editarBiblioteca(req: Request, res: Response) {

        try {

            const {idBiblioteca} = req.params;
            const {nome, url} = req.body;

            const biblioteca = await bibliotecaRepositorio.findOneBy({id: Number(idBiblioteca)});

            if(!biblioteca) {
                return res.status(404).send({
                    ok: false,
                    message: 'Biblioteca não encontrada!'
                })
            };

            if(!nome) {
                return res.status(400).send({
                    ok: false,
                    message: 'Digite o campo nome!'
                })
            };

            if(!url) {
                return res.status(400).send({
                    ok: false,
                    message: 'Digite o campo url!'
                })
            };        

           await bibliotecaRepositorio.update({id: Number(idBiblioteca)}, {nome, url});

            return res.status(200).send({
                ok: true,
                message: 'Biblioteca atualizada com sucesso!',
                data: {nome, url}
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async deletarBiblioteca(req: Request, res: Response) {

        try {

            const {idBiblioteca} = req.params;

            const biblioteca = await bibliotecaRepositorio.findOneBy({id: Number(idBiblioteca)});

            if(!biblioteca) {
                return res.status(404).send({
                    ok: false,
                    message: 'Biblioteca não encontrada!'
                })
            }

            const livros = await livroRepositorio.findBy({
                biblioteca: {
                    id: Number(idBiblioteca)
                }
            })

            if(livros && livros.length > 0) {
                await livroRepositorio.delete({
                    biblioteca: {
                        id: Number(idBiblioteca)
                    }
                })
            }

            await bibliotecaRepositorio.delete({id: Number(idBiblioteca)});

            return res.status(200).send({
                ok: true,
                message: 'Biblioteca excluída com sucesso!'
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

}