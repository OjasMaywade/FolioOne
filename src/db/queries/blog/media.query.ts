import { db } from "../../index.db.js";

const addBlogMedia = async(id, blogId, mediaURL, description)=>{
    return await db
    .insertInto('blog_media') // add blog media table to mysql
    .values({
        media_url: mediaURL,
        alt_text: description,
        blog_id: blogId,
        uploaded_by: id
    })
    .executeTakeFirst();
}

export default {
    addBlogMedia
}