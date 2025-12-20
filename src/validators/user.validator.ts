import {z} from "zod";

const register = z.object({
    firstname: z.string().trim().min(2,{message: "first Name Must be 2 or more characters Long"}).max(30, {message: "first Name Must be less than 30 characters Long"}),
    lastname: z.string().min(2,{message: "last Name Must be 2 or more characters long"}).max(30, {message: "last Name Must be less than 30 characters Long"}),
    username: z.string().min(3).max(30),
    email: z.string().email({message: "invalid email structure"}),
    password: z.string().min(8, {message: "Password must be 8 or more character long"}).max(16,{message: "Password should be less than 17 characters long"})
  });


const login = z.object({
    email: z.string().email({message: "invalid email structure"}).optional(),
    username: z.string().optional(),
    password: z.string()
  }).refine((data)=> data.email || data.username,{
    message: "either of email or username is required"
  }
);

const updateProfile = z.object({
    firstname: z.string().min(2,{message: "first Name Must be 2 or more characters Long"}).max(30, {message: "first Name Must be less than 30 characters Long"}).optional(),
    lastname: z.string().min(2,{message: "last Name Must be 2 or more characters long"}).max(30, {message: "last Name Must be less than 30 characters Long"}).optional(),
    username: z.string().min(3).max(30).optional(),
    email: z.string().email({message: "invalid email structure"}).optional(),
}).refine((data)=> data.email || data.username || data.firstname || data.lastname,{
    message: "either of one field is required"
  }
);

//add refine to check and throw error for new password with space and special character
const resetPassword = z.object({
  oldPassword: z.string(),
  newPassword: z.string()
}).refine((data)=> data.oldPassword !== data.newPassword,{
  message: "Old and new password cannot be same"
});

const updateProfilePic = z.object({
  mimetype: z.enum(['image/jpeg', 'image/png'], {message: "Invalid file type. Only jpeg and png is allowed"}),
  size: z.number().max(5*1024*1024, {message: "Image size is must be less than 5 MB"})
})

export  default{
  register,
  login,
  updateProfile,
  resetPassword,
  updateProfilePic
}

