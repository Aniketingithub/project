const express = require("express")
const app = express()

// Define different routes
const registerRoute = require("./routes/register")
const getUserRoute = require("./routes/getUser")

// add middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/register", registerRoute)
app.use("/api/getuser", getUserRoute)

app.get("/", (req, res) => {
   res.send("In home page.")
})

module.exports = app.listen(3000, () => {
   console.log("Server running...");
})