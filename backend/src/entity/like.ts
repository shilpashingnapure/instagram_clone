import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post";

@Entity()
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    liked_user_id : string 

    @Column()
    post_id : string

    @ManyToOne(() => Post , post => post.likes , { onDelete: 'CASCADE'})
    @JoinColumn({ name : 'post_id'})
    post : Post;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;


    constructor(postId : string , liked_user_id : string){
        this.post_id = postId;
        this.liked_user_id = liked_user_id;
    }


}