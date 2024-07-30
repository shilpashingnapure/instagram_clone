import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Media } from "./media";
import { Comment } from "./comment";
import { User } from "./user";
import { Like } from "./like";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id : string ;

    @Column()
    user_id :string;

    @Column()
    caption : string;

    @OneToMany(() => Media , media => media.post , { cascade : true  } )
    media : Media[];

    @OneToMany(() => Comment , comment => comment.post , { cascade : true })
    comments : Comment[];

    @OneToMany(() => Like , like => like.post , { cascade : true  })
    likes : Like[];

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;


    constructor(user_id : string , caption : string ){
        this.user_id = user_id;
        this.caption = caption;
    }
}



