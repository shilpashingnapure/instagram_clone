import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "./src/entity/user";
import { Post } from "./src/entity/post";
import { Media } from "./src/entity/media";
import { Comment } from "./src/entity/comment";
import { Like } from "./src/entity/like";
config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Post, Media, Comment, Like],
  
});