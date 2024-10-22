const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        //to avoid the deprisiation warning
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB is connected to the host: ${con.connection.host} `)
    })//if error in mongodb occur then the error is not handled here so land in unhandled rejection error , that handle in server.js
}

module.exports = connectDatabase;