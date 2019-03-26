// Michael Macari
// Entry point to application
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const static = express.static(__dirname + "/public")

const configRoutes = require("./routes")
const exphbs = require("express-handlebars")

// Gets our CSS and makes it available in express under the directory public
// Otherwise public is only local to the machine, hence the need for the express.static
app.use("/public", static)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

configRoutes(app)

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
