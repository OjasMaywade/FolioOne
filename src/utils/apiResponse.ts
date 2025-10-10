class ApiResponse{
    public statusCode: number;
    public data: object|null;
    public message: string;
    public success: boolean
    constructor(statusCode: number, data: object|null, message: string){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export {ApiResponse}