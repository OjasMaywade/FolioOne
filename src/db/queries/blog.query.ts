import { db } from "../index.db.js";

const createBlog = async(id)=>{
    return await db
    .insertInto('blog')
    .values({
        author_id: id
    })
    // .returning(['id'])
    .executeTakeFirst();
}

const saveBlog = async(title, content, id, blogId)=>{
    return await db
    .updateTable('blog')
    .set({
        title: title,
        content: content
    })
    .where("id","=",blogId)
    .where("author_id","=",id)
    .executeTakeFirst();
}

//I think we can apply more checks to this like status = draft and author_id = id
const searchBlog = async(blogId)=>{
    return await db
    .selectFrom('blog')
    .select(['title', 'author_id'])
    .where("id","=", blogId)
    .executeTakeFirst();
}

const updateStatus = async(status, id, blogId)=>{
    return await db
    .updateTable('blog')
    .set({
        'status': status
    })
    .where('id','=',blogId)
    .where('author_id','=',id)
    .executeTakeFirstOrThrow();
}

const getAllDrafts = async(id)=>{
    return await db
    .selectFrom('blog')
    .select(['title', 'content', 'created_at', 'author_id', 'status'])
    .where('author_id','=',id)
    .where('status','=',"draft")
    .execute();
}

const getAllPubished = async(id)=>{
    return await db
    .selectFrom('blog')
    .select(['title','content','created_at','author_id','status'])
    .where('id','=',id)
    .where('status','=','published')
    .execute();
}

const getBlogById = async(id, blogId)=>{
    return await db
    .selectFrom('blog')
    .select(['title', 'content', 'author_id','status'])
    .where('id','=',blogId)
    .where('author_id','=',id)
    .executeTakeFirstOrThrow();
}

const getUnlistedBlogs = async(id)=>{
    return await db
    .selectFrom('blog')
    .select(['title', 'content', 'author_id', 'status'])
    .where('author_id','=',id)
    .where('status','=','unlisted')  
    //.where('status','=','published') //why two checks for status
    .execute();
}

const getBlogByStatus = async(id, status)=>{
    return await db
    .selectFrom('blog')
    .select(['title','content','created_at','author_id','status'])
    .where('author_id','=',id)
    .where('status', '=', status)
    .executeTakeFirst();
}

const getPublishedBlogs = async()=>{
    return await db
    .selectFrom('blog')
    .select(['title','content','created_at','author_id','status'])
    .where('status','=', 'published')
    .execute();
}
const deleteBlog = async(id, blogId)=>{
    return await db
    .deleteFrom('blog')
    .where('author_id','=',id)
    .where('id','=',blogId)
    .executeTakeFirstOrThrow();
}

const unlistBlog = async(id, blogId, status)=>{
    return await db
    .updateTable('blog')
    .set({
        status: status
    })
    .where('id','=',blogId)
    .where('author_id','=',id)
    .where('status','=','published')
    .executeTakeFirstOrThrow();
}


//should i return the blog content after the saving operation
const saveAndPublish = async(id, blogId, title, content)=>{
    return await db
    .updateTable('blog')
    .set({
        title: title,
        content: content,
        status: 'published'
    })
    .where('id', '=', blogId)
    .where('author_id','=', id)
    .execute()
}

const getBlog = async(blogId)=>{
    return await db
    .selectFrom('blog')
    .select(['title','content','author_id','created_at'])
    .where('id','=',blogId)
    .where('status','=','published')
    .executeTakeFirst();
}

const search = async(searchparams)=>{
    return await db
    .selectFrom('blog')
    .select(['title', 'content', 'created_at','author_id'])
    
}

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
    createBlog,
    saveBlog,
    searchBlog,
    updateStatus,
    getAllDrafts,
    getAllPubished,
    getBlogById,
    getUnlistedBlogs,
    deleteBlog,
    unlistBlog,
    saveAndPublish,
    getBlogByStatus,
    getPublishedBlogs,
    getBlog,
    search,
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