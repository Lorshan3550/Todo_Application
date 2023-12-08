import express from "express"
import mysql from "mysql"
import cors from "cors"
import dotenv from "dotenv"

const config = dotenv.config()
const app = express()
const port = 4000

const HOST = process.env.HOST
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DATABASE = 'test'

const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database : DATABASE
})

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Samsung123_';


app.use(express.json())
app.use(cors())

app.get("/", (req,res)=> {
    res.json("hello this is the backend")
})

app.get("/books", (req,res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/books/:id", (req,res) => {
    const bookId = req.params.id
    const q = "SELECT * FROM books WHERE id = ?"
    db.query(q,[bookId], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)"
    const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price
]

    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("Book has been created")
    })
})

app.delete("/books/:id", (req,res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId], (err,data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully")
    })

})

app.patch("/books/:id", (req,res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ? , `desc` = ? , `price` = ? , `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values,bookId] , (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been updated successfully")
    })
} )


app.listen(port , () => {
    console.log(`Server running on port ${port}`)
})