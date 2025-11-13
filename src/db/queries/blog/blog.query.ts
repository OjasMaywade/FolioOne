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
    .where('')
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
    search
}