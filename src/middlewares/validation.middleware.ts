const Validator = (schema, type)=>{
    return (req, res, next)=>{
        const select = {
            body: req.body,
            params: req.params,
            query: req.query,
            file: req.file
        }
    try {
        const validated =  schema.parse(select[type]);
        req.validated = validated;
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
    Validator
}