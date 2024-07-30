import { Request, Response } from "express";
import { CustomRequest } from "../middleware/authentication";
import { createPost, deletePost, getAllPost } from "../services/postService";
import { Media } from "../entity/media";
import { addMedia } from "../services/mediaService";

// *********************** create post ***************************
export const createPostHandler = async (req: CustomRequest, res: Response) => {
  const userId = req.user.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  try {
    const { caption, media } = req.body;
    const newPost = await createPost(userId, caption);

    const mediaEntities = media.map((item) => {
      const mediaEntity = new Media(item.type, item.url, newPost);
      return mediaEntity;
    });

    await addMedia(mediaEntities);
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// *********************** get all posts by all users ***************
export const getAllFeedsHandler = async (req: CustomRequest, res: Response) => {
  const userId = req.user.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  try {
    const posts = await getAllPost(userId);
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ************************ remove post of logined user ************************************
export const deletePostHandler = async (req: CustomRequest, res: Response) => {
  const userId = req.user.userId;
  const { id } = req.params;
  if (!userId || !id) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  try {
    const post = await deletePost(id, userId);
    if (!post) {
      return res.status(500).json({ message: "Failed to delete post." });
    }
    return res.status(200).json({ message: "Post delete successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
