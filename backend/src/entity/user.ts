import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string ;

    @Column({ unique : true })
    username : string;

    @Column()
    fullname : string;

    @Column( { nullable : true })
    firstname : string;

    @Column( { nullable : true })
    lastname : string;

    @Column({ unique : true })
    email : string;

    @Column()
    password : string;

    @Column( { nullable : true })
    profilePhoto? : string;

    @OneToMany(() => Post , post => post.user)
    posts : Post[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;


    constructor(username : string , email : string , firstname : string , lastname: string , fullname : string , password : string , profilePhoto? : string ){
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname
        this.fullname = fullname;
        this.email = email ;
        this.password = password;
        this.profilePhoto = profilePhoto;
    }
}



