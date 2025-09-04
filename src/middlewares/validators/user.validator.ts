import {z} from "zod";

const userSchema = z.object({
  body: z.object({
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    username: z.string().min(3)
  })  
})