module.exports = func => (req, res, next)=>
        // just catch if any async error and pass to global error middleware in app.js
//  using next() else resolve  it and pass to controllers
        Promise.resolve(func(req, res, next)).catch(next)
