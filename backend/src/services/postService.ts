import { AppDataSource } from "../../ormconfig";
import { Comment } from "../entity/comment";
import { Like } from "../entity/like";
import { Post } from "../entity/post";

const postRepository = AppDataSource.getRepository(Post);
const likeRepository = AppDataSource.getRepository(Like);


/**
 * Creates a new post and returns it with like status.
 * @param userId - The ID of the user creating the post.
 * @param caption - The caption of the post.
 * @returns The newly created post with like status.
 */
export async function createPost(userId : string , caption : string){
    const newPost = new Post(userId  , caption);
    await postRepository.save(newPost);

    const post = await postRepository.findOne({ where : { id : newPost?.id } ,   relations : ['media' , 'comments' , 'comments.user' ,  'user' , 'likes']})
    const loginUserLikes = await likeRepository.find({ where : { liked_user_id : userId }});
    const likedPostIds = new Set(loginUserLikes.map(like => like.post_id));


    const postsWithLikeStatus = {
        ...newPost ,
        totalLikes : post?.likes?.length ,
        isLikedByUser : likedPostIds.has(post.id)
    }

    return postsWithLikeStatus; 
}


/**
 * Retrieves all posts with like status for the logged-in user.
 * @param userId - The ID of the logged-in user.
 * @returns All posts with like status.
 */
export async function getAllPost(userId : string){
    const posts = await postRepository.find({ relations : ['media' , 'comments' , 'comments.user' ,  'user' , 'likes'] , order : {
        created_at : 'DESC'
    }})

    // this is to get if loged user liked any post or not
    const loginUserLikes = await likeRepository.find({ where : { liked_user_id : userId }});
    const likedPostIds = new Set(loginUserLikes.map(like => like.post_id));


    const postsWithLikeStatus = posts.map(post => ({
        ...post ,
        totalLikes : post?.likes?.length ,
        isLikedByUser : likedPostIds.has(post.id)
    }))

    return postsWithLikeStatus; 
}

 
/**
 * Deletes a post if it belongs to the user.
 * @param postId - The ID of the post to delete.
 * @param userId - The ID of the user attempting to delete the post.
 * @returns True if the post was deleted successfully.
 * @throws Error if the post is not found or not authorized to delete.
 */
export async function deletePost(postId : string , userId : string ){
    const post = await postRepository.findOne({ where : { id : postId , user_id : userId}})

    if (!post) {
        throw new Error('Post not found or not authorized to delete this post');
      }
    await postRepository.remove(post);
    return true;

}




