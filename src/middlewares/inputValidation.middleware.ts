import z from "zod";

const bodyValidator = (schema)=>{
    return (req, res, next)=>{
    try {
        const validated =  schema.parse(req.body);
        req.validatedBody = validated;
        next();
    } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
}

export  {
    bodyValidator
}