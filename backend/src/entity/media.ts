import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post";

@Entity()
export class Media {
    @PrimaryGeneratedColumn('uuid')
    id : string ;

    @Column()
    type : string

    @Column()
    url : string

    @ManyToOne(() => Post , post => post.media , { onDelete: 'CASCADE'})
    post : Post;

    constructor(type : string , url : string  , post : Post){
        this.type = type;
        this.url = url;
        this.post = post;
    }
}



