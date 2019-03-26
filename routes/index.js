// Michael Macari
// Index js file for all the routes
const searchRoute = require('./search')
const path = require('path')

const constructorMethod = (app) => {
    
    app.get("/", (req, res) => {
        res.sendFile(path.resolve("static/main.html"))
    })

    app.use("/search", searchRoute)
    
    // All else send 404
    app.use("*", (req, res) => {
        // 404 Not found page if we enter invalid URL
        res.sendStatus(404)
    })
}

module.exports = constructorMethod