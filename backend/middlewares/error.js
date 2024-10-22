//handler function
module.exports = (err, req, res, next) =>{
    err.statusCode  = err.statusCode || 500;


    if(process.env.NODE_ENV == 'development'){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            //copy to find where the error occured ,help to abstract the error message in prod 
            error: err
        })
    }

    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error = new Error(message);
       

        if(err.name == "ValidationError") {
            //object.values return array of values 
            message = Object.values(err.errors).map(value => value.message)//return arr
            error = new Error(message)
            err.statusCode = 400
        }
        //occur when i give product id kanna pinna
        if(err.name == 'CastError'){
            message = `Resource not found: ${err.path}` ;
            error = new Error(message)//but this convert arr to str
            err.statusCode = 400
        }

        if(err.code == 11000) {
            let message = `Duplicate ${Object.keys(err.keyValue)} error`;
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.name == 'JSONWebTokenError') {
            let message = `JSON Web Token is invalid. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.name == 'TokenExpiredError') {
            let message = `JSON Web Token is expired. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })
    }
}