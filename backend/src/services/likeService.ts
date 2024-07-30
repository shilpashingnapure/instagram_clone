import { AppDataSource } from "../../ormconfig";
import { Like } from "../entity/like";

const likeRepository = AppDataSource.getRepository(Like);
/**
 * Checks if logined user like this post or not
 * @param postId - The ID of post to be check for
 * @param userId - The ID of user to be check for like
 * @returns - return boolean if user like post true , else false
*/
export async function isUserLiked(postId : string , userId : string){
    const isLiked = await likeRepository.findOne({ where : { post_id  : postId , liked_user_id :  userId }})

    if(isLiked){
        return true;
    }
    return false;

}

/**
 * Like the Post and returns True
 * @param postId - The ID of the post to be liked.
 * @param userId - The ID of the user liking the post.
 * @returns A boolean indicating the operation was successful (true).

*/
export async function likedToPost(postId : string , userId : string){
    const likedPost = new Like(postId , userId);
    await likeRepository.save(likedPost);

    return true;
}

/**
 * Removes a like from a post by a user if it exists.
 * @param postId - The ID of the post to be unliked.
 * @param userId - The ID of the user who liked the post.
  * @returns A boolean indicating the operation was successful (true).
*/
export async function unlikeToPost(postId : string , userId : string){
    const isLiked = await likeRepository.findOne({ where : { post_id : postId  , liked_user_id :  userId }})
    await likeRepository.remove(isLiked);

    return true;



}