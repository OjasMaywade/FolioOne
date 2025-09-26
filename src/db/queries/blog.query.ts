import { db } from "../index.db.js";

const createBlog = async(title, content, status, private_blog, id)=>{
    return await db
    .insertInto('blog')
    .values({
        title: title,
        content: content,
        status: status,
        private: private_blog,
        author_id: id
    })
    .returning('id')
    .executeTakeFirst();
}

export default {
    createBlog
}