import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post";
import { User } from "./user";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id : string ;

    @Column()
    comment : string;

    @Column()
    comment_user_id : string

    @Column()
    post_id : string;


    @ManyToOne(() => Post , post => post.comments , { onDelete: 'CASCADE'} )
    @JoinColumn({ name : 'post_id' })
    post : Post;

    @ManyToOne(() => User)
    @JoinColumn({ name : "comment_user_id"})
    user : User;


    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;


    constructor(postId : string , comment_user_id : string , comment : string){
        this.post_id = postId 
        this.comment_user_id = comment_user_id
        this.comment = comment;
    }
}


