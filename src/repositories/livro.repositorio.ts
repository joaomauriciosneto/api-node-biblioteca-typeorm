import { appDataSource } from "../data-source";
import { Livro } from "../entities/Livro";

export const livroRepositorio = appDataSource.getRepository(Livro);