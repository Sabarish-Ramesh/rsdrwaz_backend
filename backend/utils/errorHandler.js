class ErrorHandler extends Error {
    //must pass this constructor details as arguments when funcitn call
    constructor(message, statusCode) {
        super(message)//sending data to parent class
        this.statusCode = statusCode;
        //this enable better debugging
        Error.captureStackTrace(this, this.constructor)//to find error exactly 
    }
}

module.exports = ErrorHandler;