class ApiResponse{
    public statusCode: number;
    public data: object|null;
    public message: string;
    public success: boolean
    constructor(statusCode: number, message: string, data?: object|null ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export {ApiResponse}