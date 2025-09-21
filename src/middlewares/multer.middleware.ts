import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/temp')
    },
    filename: function(req, file, cb){
        const {username} = req.res.locals.user;
        const type = file.originalname.split(".")[1];
        cb(null, username + '_' + file.fieldname + '-' + Date.now() + "." + type)
    }
})

export const upload = multer({
    storage: storage
})