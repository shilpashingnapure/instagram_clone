import { Response } from "express";
import { CustomRequest } from "../middleware/authentication";
import {
  isUserLiked,
  likedToPost,
  unlikeToPost,
} from "../services/likeService";

export const likePostHandler = async (req: CustomRequest, res: Response) => {
  const userId = req.user.userId;
  const { postId } = req.body;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  // postid and userid required
  if (!postId || !userId) {
    return res
      .status(400)
      .json({ message: "Post ID and User ID are required." });
  }

  try {
    // if this user is present on that post in like table remove from table
    const isPostLiked = await isUserLiked(postId, userId);

    if (isPostLiked) {
      // Unlike the post if it's already liked
      const unliked = await unlikeToPost(postId, userId);
      if (!unliked) {
        return res.status(500).json({ message: "Failed to remove like." });
      }
      return res.status(200).json({ message: "Post unliked successfully." });
    } else {
      // Like the post if it's not already liked
      const liked = await likedToPost(postId, userId);
      if (!liked) {
        return res.status(500).json({ message: "Failed to add like." });
      }
      return res.status(200).json({ message: "Post liked successfully." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
