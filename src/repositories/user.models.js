import mongoose from "mongoose";

const userSchema = mongoose.Schema({
email: {
    type: String,
    
}
}, {
    
})


export const User = mongoose.model("User", "userSchema")