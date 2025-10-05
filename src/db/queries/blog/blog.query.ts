import { db } from "../../index.db.js";

const createBlog = async(id)=>{
    return await db
    .insertInto('blog')
    .values({
        author_id: id
    })
    // .returning(['id'])
    .executeTakeFirst();
}

const saveBlog = async(title, content, blogId, id)=>{
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

const updateStatus = async(status, isPrivate, id, blogId)=>{
    return await db
    .updateTable('blog')
    .set({
        'status': status,
        'is_private': isPrivate
    })
    .where('id','=',blogId)
    .where('author_id','=',id)
    .executeTakeFirst();
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

const getDraftByID = async(id, blogId)=>{
    return await db
    .selectFrom('blog')
    .select(['title', 'content', 'author_id', 'created_at', 'updated_at', 'status'])
    .where('id','=',blogId)
    .where('author_id','=',id)
    .executeTakeFirst();
}
export default {
    createBlog,
    saveBlog,
    searchBlog,
    updateStatus,
    getAllDrafts,
    getAllPubished,
    getDraftByID
}