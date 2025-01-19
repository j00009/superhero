const express = require('express')
const app = express()


app.use(express.static("assets"))
app.use(express.json())
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")

})


app.listen(3000, () => {
    console.log('app corriendo en puerto 3000')
})