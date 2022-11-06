import { appDataSource } from "../data-source";
import { Biblioteca } from "../entities/Biblioteca";

export const bibliotecaRepositorio = appDataSource.getRepository(Biblioteca);