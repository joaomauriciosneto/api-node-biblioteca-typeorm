import { Request, Response } from "express";
import { bibliotecaRepositorio } from "../repositories/biblioteca.repositorio";
import { livroRepositorio } from "../repositories/livro.repositorio";

export class LivroController {

    async criarLivro(req: Request, res: Response) {

        try {

            const {idBiblioteca} = req.params;
            const {titulo, autor, ano} = req.body;

            const biblioteca = await bibliotecaRepositorio.findOneBy({id: Number(idBiblioteca)});

            if(!biblioteca) {
                return res.status(404).send({
                    ok: false,
                    message: 'Biblioteca não encontrada!'
                })
            }

            if(!titulo) {
                return res.status(400).send({
                    ok: false,
                    message: 'Preencha o campo título!'
                })
            }

            if(!autor) {
                return res.status(400).send({
                    ok: false,
                    message: 'Preenhca o campo autor!'
                })
            }

            if(!ano) {
                return res.status(400).send({
                    ok: false,
                    message: 'Preencha o campo ano!'
                })
            }

            const novoLivro = livroRepositorio.create({
                biblioteca,
                titulo,
                autor,
                ano
            })

            await livroRepositorio.save(novoLivro);

            return res.status(201).send({
                ok: true,
                message: 'Livro cadastrado com sucesso!',
                data: novoLivro
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async listarLivros(req: Request, res: Response) {

        try {

            const {titulo} = req.query;

            let livros = await livroRepositorio.find();

            if(livros == null || livros.length == 0) {
                return res.status(400).send({
                    ok: false,
                    message: 'No momento estamos sem exemplares!'
                })
            }

            if(titulo) {
                livros = livros.filter(livro => livro.titulo.toUpperCase() == titulo.toString().toUpperCase());
            }

            return res.status(200).send({
                ok: false,
                message: 'Listagem de todos os livros!',
                data: livros
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async editarLivro(req: Request, res: Response) {

        try {

            const {idBiblioteca, idLivro} = req.params;
            const {titulo, autor, ano} = req.body;

            if(!titulo) {
                return res.status(400).send({
                    ok: false,
                    message: 'Preencha o campo título!'
                })
            };

            if(!autor) {
                return res.status(400).send({
                    ok: false,
                    message: 'Preencha o campo autor!'
                })
            };

            if(!ano) {
                return res.status(400).send({
                    ok: false,
                    message: 'Preencha o campo ano!'
                })
            }

            const biblioteca = await bibliotecaRepositorio.findOneBy({id: Number(idBiblioteca)});

            if(!biblioteca) {
                return res.status(404).send({
                    ok: false,
                    message: 'Biblioteca não encontrada'
                })
            }

            const livro = await livroRepositorio.findOneBy({
                id: Number(idLivro),
                biblioteca: {id: biblioteca.id}
            });

            if(!livro) {
                return res.status(404).send({
                    ok: false,
                    message: 'Livro não encontrado!'
                })
            };

            livro.titulo = titulo;
            livro.autor = autor;
            livro.ano = ano;                
            
            await livroRepositorio.save(livro);

            return res.status(200).send({
                ok: true,
                message: 'Livro atualizado com sucesso!'
            })

        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor'
            })

        }

    }

    async deletarLivro(req: Request, res: Response) {

        try {

            const {idLivro} = req.params;

            const livro = await livroRepositorio.findOneBy({id: Number(idLivro)});

            if(!livro) {
                return res.status(404).send({
                    ok: false,
                    message: 'Livro não encontrado!'
                })
            }
            
            await livroRepositorio.delete(livro);

            return res.status(200).send({
                ok: true,
                message: 'Livro excluído com sucesso!'
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