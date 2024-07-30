import express from "express";
import cors from "cors";
import { AppDataSource } from "../ormconfig";
import { authenticate } from "./middleware/authentication";
import cookieParser from "cookie-parser";
import {
  loginUserEditProfile,
  loginUserProfile,
  searchForUsers,
  userFullProfile,
  userLogin,
  userLogout,
  userRegister,
} from "./controllers/user.controller";
import {
  createPostHandler,
  deletePostHandler,
  getAllFeedsHandler,
} from "./controllers/post.controller";
import { createCommentHandler, deleteCommentHandler } from "./controllers/comment.controller";
import { likePostHandler } from "./controllers/like.controller";

const allowedOrigins = ["http://localhost:3000" , "https://photo-grammm.vercel.app" , "http://photo-grammm.vercel.app"]

async function startServer() {
  await AppDataSource.initialize();

  const app = express();
  app.use(
    cors({
      credentials: true, // Allow cookies to be sent
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    })
  );
  app.use(cookieParser());
  app.use(express.json());

  // ***************************** user API's *********************************
  app.post("/register", userRegister);

  app.post("/login", userLogin);

  app.post("/logout", userLogout);

  // get logined user full profile
  app.get("/profile", authenticate, loginUserProfile);

  app.patch("/user-edit", authenticate, loginUserEditProfile);
  // get any user full profile

  app.get("/user/:username", userFullProfile);
  // search for user

  app.get("/search", searchForUsers);



  // ***************************** post API's *********************************
  app.get("/feeds", authenticate, getAllFeedsHandler);

  app.post("/post", authenticate, createPostHandler);

  app.delete("/post/:id", authenticate, deletePostHandler);



  // ***************************** comments API's *********************************
  app.post("/comment", authenticate, createCommentHandler);
  app.delete("/comment/:id" , authenticate , deleteCommentHandler)



  // ***************************** like  API's *********************************
  app.post("/like", authenticate, likePostHandler);


  const port = process.env.PORT || 4000;
  app.listen(port , () => {
    console.log("server is running !!!");
  });
}

startServer().catch((err) => {
  console.log(err);
});
