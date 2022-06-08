const express = require('express')
const app = express()
const port = process.env.PORT || 3500
const bodyParser = require('body-parser')
const cors = require('cors');



app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}));

const routes = require('./settings/routes')
routes(app)
    
app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})