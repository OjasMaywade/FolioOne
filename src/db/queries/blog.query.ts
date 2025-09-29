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

const updateStatus = async(status, private_blog, id, blogId)=>{
    return await db
    .updateTable('blog')
    .set({
        'status': status,
        'private': private_blog
    })
    .where('id','=',blogId)
    .where('author_id','=',id)
    .executeTakeFirst();
}

export default {
    createBlog,
    saveBlog,
    searchBlog,
    updateStatus
}