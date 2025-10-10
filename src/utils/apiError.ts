class ApiError extends Error{
    public statusCode: number;
    public error?: any;
    constructor(message, statusCode, error, stack = ""){
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.error = error;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export {ApiError}