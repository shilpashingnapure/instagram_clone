import { AppDataSource } from "../../ormconfig";
import { Comment } from "../entity/comment";

const commentRepository = AppDataSource.getRepository(Comment);
export async function createComment(post_id : string , comment_user_id : string  , comment : string){
    
    const newComment = new Comment(post_id , comment_user_id , comment)
    const savedComment = await commentRepository.save(newComment);
    const commentWithUser = await commentRepository.findOne({ where : { id : savedComment.id } ,  relations : ['user']})
    return commentWithUser

}


export async function deleteComment( commentId : string ){
    const comment = await commentRepository.findOne({ where : { id : commentId }});

    if (!comment) {
        // Handle the case where the post is not found or does not belong to the user
        throw new Error('Post not found or not authorized to delete this post');
      }
    await commentRepository.remove(comment);
    return true;
}