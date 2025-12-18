import {z} from "zod";

const register = z.object({
    firstname: z.string().min(2,{message: "first Name Must be 2 or more characters Long"}).max(30, {message: "first Name Must be less than 30 characters Long"}),
    lastname: z.string().min(2,{message: "last Name Must be 2 or more characters long"}).max(30, {message: "last Name Must be less than 30 characters Long"}),
    username: z.string().min(3).max(30),
    email: z.string().email({message: "invalid email formatting"}),
    password: z.string().min(8, {message: "Password must be 8 or more character long"}).max(16,{message: "Password should be less than 17 characters long"})
  });

export  default{
  register
}