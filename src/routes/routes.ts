import { Router } from "express";
import { BibliotecaController } from "../controllers/biblioteca.controller";
import { LivroController } from "../controllers/livro.controller";
import { TermosController } from "../controllers/termos.controller";

export const routes = Router();

routes.get('/termos', new TermosController().termos);

routes.post('/biblioteca', new BibliotecaController().criarBiblioteca);

routes.put('/biblioteca/:idBiblioteca', new BibliotecaController().editarBiblioteca);

routes.get('/biblioteca', new BibliotecaController().listarBibliotecas);

routes.delete('/biblioteca/:idBiblioteca', new BibliotecaController().deletarBiblioteca);

routes.post('/livro/:idBiblioteca', new LivroController().criarLivro);

routes.get('/livro', new LivroController().listarLivros);

routes.put('/livro/:idBiblioteca/:idLivro', new LivroController().editarLivro);

routes.delete('/livro/:idLivro', new LivroController().deletarLivro);

