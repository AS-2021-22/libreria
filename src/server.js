const express               = require('express')
const bodyParser            = require('body-parser')
const mysql                 = require('mysql')
const path                  = require('path')
const {renderFile}          = require('ejs')
//const xml                   = require('xml')
//const xmlParser             = require('express-xml-parser')

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
//app.use(xmlParser())

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

app.route('/')

    .get((_,res) => {
        res.render(path.join(htmlFolder,'index.html'),{nome:'hello world'})
    })

    .post((req,res) => {
        const {ISBN,autore,titolo} = req.body
        const sql = /*sql*/`INSERT INTO libri (ISBN,autore,titolo) VALUES ("${ISBN}","${autore}","${titolo}")`
        DB.query(sql,(err) =>{
            if(err) res.status(500).json({'sql error':err.message})
            else res.status(200).json({'result':"book inserted"})
        })
    })

    .put((req,res)=>{
        const {ISBN,autore,titolo} = req.body
        const sql = /*sql*/`UPDATE libri SET titolo = "${titolo}", autore = "${autore}" WHERE ISBN = "${ISBN}"`
        DB.query(sql,(err) =>{
            if(err) res.status(500).json({'sql error':err.message})
            else res.status(200).json({'result':"book updated"})
        })
    })


app.get('/add_libro',(_,res)=> {
    res.sendFile(path.join(htmlFolder,'add_libro.html'))
})

app.delete('/:ISBN',(req,res) =>{
    const {ISBN} = req.params
    const sql = /*sql*/`DELETE FROM libri WHERE ISBN = "${ISBN}"`
    DB.query(sql,(err)=>{
        if(err) res.status(500).json({'sql error':e.message})
        else res.status(200).json({'result':"book deleted"})
    })
})


app.post('/get_libri',(req,res) => {
    const sql = /*sql*/`SELECT * FROM libri ${req.filter || ''}`
    DB.query(sql,(err,result)=>{
        if(err) res.status(500).json({'sql error':err.message})
        else res.status(200).json(result)
    })
})

app.get('/get_libri',(req,res) => {
    const sql = /*sql*/`SELECT * FROM libri ${req.filter || ''}`
    DB.query(sql,(err,result)=>{
        if(err) res.status(500).json({'sql error':err.message})
        else res.status(200).json(result)
    })
})



