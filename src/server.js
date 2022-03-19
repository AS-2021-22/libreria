const express               = require('express')
const bodyParser            = require('body-parser')
const mysql                 = require('mysql')
const path                  = require('path')
const {renderFile}          = require('ejs')

                              require('dotenv/config')

const PORT = process.env.PORT || 5000
const htmlFolder = path.join(__dirname, '..','public','html')

const app = express()
const DB = mysql.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PW,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, '..','public')))

app.engine('html', renderFile)
app.set('view engine', 'html')
app.set('views', __dirname)

DB.connect((err) => {
    if (err) console.log('DB not connected')
    else{
        console.log('DB connected')
        app.listen(PORT,() => console.log(`> Server listening on PORT: ${PORT}`))
    }
})

app.get('/',(_,res) => {
    res.render(path.join(htmlFolder,'index.html'),{nome:'hello world'})
})





