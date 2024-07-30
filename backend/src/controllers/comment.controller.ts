import { Response } from "express";
import { CustomRequest } from "../middleware/authentication";
import { createComment, deleteComment } from "../services/commentService";

// ***************************** create comment for post ************************************
export const createCommentHandler = async (req: CustomRequest, res: Response) => {
  const userId = req.user.userId;
  const { postId, comment } = req.body;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  try {
    const newComment = await createComment(postId, userId, comment);

    return res.status(201).json(newComment);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteCommentHandler = async (req : CustomRequest , res : Response) => {
    const { id } = req.params;

    if(!id){
      return res.status(400).json({ success : false , message : "comment Id is required "});
    }

    try{
      const comment = await deleteComment(id);
      if(!comment){
        return res.status(500).json({ message: "Failed to delete post." });
    }
    return res.status(200).json({ message: "Post delete successfully." });

    }catch(err){
      return res.status(500).json({ message : "Internal server errror"});
    }
}