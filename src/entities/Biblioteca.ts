import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Livro } from "./Livro";

@Entity('biblioteca')
export class Biblioteca {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    nome: string;

    @Column({type: 'text'})
    url: string;

    @OneToMany(() => Livro, livro => livro.biblioteca)
    livros: Livro;
}