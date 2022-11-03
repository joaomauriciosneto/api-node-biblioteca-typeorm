import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Biblioteca } from "./Biblioteca";

@Entity('livro')
export class Livro {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    titulo: string;

    @Column({type: 'text'})
    autor: string;

    @Column({type: 'text'})
    ano: string;

    @ManyToOne(() => Biblioteca, biblioteca => biblioteca.livros)
    @JoinColumn({name: 'id_biblioteca'})
    biblioteca: Biblioteca;

}