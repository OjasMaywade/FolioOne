import { db } from "../index.db.js";

const bookmark = async(id, userId)=>{
    return await db
    .insertInto('bookmark')
    .values({
        user_id: userId,
        blog_id: id,
    })
    .executeTakeFirst()
}

const removeBookmark = async(userId, blogId)=>{
    return await db
    .deleteFrom('bookmark')
    .where('blog_id','=',blogId)
    .where('user_id','=',userId)
    .executeTakeFirst();
}

const likeBlog = async(id, userId)=>{
    return await db
    .insertInto('blog_likes')
    .values({
        blog_id: id,
        user_id: userId
    })
    .executeTakeFirst()
}

const removeLike = async(userId, blogId)=>{
    return await db
    .deleteFrom('blog_likes')
    .where('blog_id','=',blogId)
    .where('user_id','=',userId)
    .executeTakeFirst();
}

const blogComment = async(id, userId, comment)=>{
    return await db
    .insertInto('comment')
    .values({
        comment: comment,
        user_id: userId,
        blog_id: id
    })
    .executeTakeFirst()
}

const editComment = async(userId, commentId, comment)=>{
    return await db
    .updateTable('comment')
    .set({
        comment: comment,
        status: "edited"
    })
    .where('id','=',commentId)
    .where('user_id','=',userId)
    .executeTakeFirst();
}

const deleteComment = async(userId, commentId)=>{
    return await db
    .updateTable('comment')
    .set({
        status: "deleted"
    })
    .where('id','=',commentId)
    .where('user_id','=',userId)
    .executeTakeFirst()
}

const likeComment = async(commentId, userId)=>{
    return await db
    .insertInto('comment_likes')
    .values({
        comment_id: commentId,
        user_id: userId
    })
    .executeTakeFirst();
}

const removeCommentLike = async(userId, commentId)=>{
    return await db
    .deleteFrom('comment_likes')
    .where('comment_id','=',commentId)
    .where('user_id','=',userId)
    .executeTakeFirst()
}

const getComment = async(blogId)=>{
    return await db
    .selectFrom('comment')
    .select(['comment','parent_comment','id'])
    .where('blog_id','=',blogId)
    .execute();
}

export default {
    bookmark,
    removeBookmark,
    likeBlog,
    removeLike,
    blogComment,
    editComment,
    deleteComment,
    likeComment,
    removeCommentLike,
    getComment
}