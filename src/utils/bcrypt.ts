import bcrypt from 'bcrypt';

const hashPassword = async (password)=>{
    try {
      return await bcrypt.hash(password, 10)
    } catch (error) {
        throw new error(`Error while hashing: ${error}`)
    }
}

const comparePassword = async (password, hashedPassword)=>{
    try {
        return bcrypt.compare(password, hashedPassword)
    } catch (error) {
        throw new error(`Error while comparing paswword: ${error}`)
    }
}
export default {hashPassword, comparePassword}