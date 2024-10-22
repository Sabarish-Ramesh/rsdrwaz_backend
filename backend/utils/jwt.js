const sendToken = (user, statusCode, res) => {

    //Creating JWT Token
    const token = user.getJwtToken();

    //setting cookies 
    const options = {
        expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_TIME  * 24 * 60 * 60 * 1000 //7d
            ),
        httpOnly: true,
    }

    res.status(statusCode)
    .cookie('token', token, options)//setting to browser cookie field
    .json({
        success: true,
        token,
        user
    })


}

module.exports = sendToken;