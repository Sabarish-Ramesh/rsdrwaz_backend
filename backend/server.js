const app = require('./app');
const path = require('path');
const connectDatabase = require('./config/database');


connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `)
})
//error when caught not given in db() in config folder
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(() => {
        process.exit(1);
    })
})

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(() => {
        process.exit(1);
    })
})
//to show when command prompt press cntrl+C
process.on('SIGINT', () => {
    console.log('Received SIGINT. Exiting gracefully...');
    process.exit();
});




