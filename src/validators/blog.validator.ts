import { title } from "process";
import z from "zod";
//add uuid in place of normal number id's
const mediaUpload = z.object({

})

const saveChanges = z.object({
    title: z.string(),
    content: z.string()
})

//likely to be changed as id change from natural number to uuid(something new secured)
const params = z.string().min(1,{message: "minimum one character is required"});


export default {
    saveChanges,
    params
}