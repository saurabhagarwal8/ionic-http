const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(morgan("short"));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) =>{
    console.log("/ running")
    res.sendFile(__dirname+'/public/home.html');
})


const connection = mysql.createConnection({
    host: 'localhost',
    user: "saurabh",
    password: "saurabh",
    database: 'newtab'
})

app.post('/create_todo' ,(req,res) =>{
    console.log("Trying to create todo");
    var todo=req.body.todo;
    const queryStr='INSERT INTO todolist (todos) VALUES ("'+todo+'")';
    connection.query(queryStr, (err,rows,fiels)=>{
        if(err){
            console.log("Error : "+err);
            res.sendStatus(504);
        }
        console.log("Inserted user");
        res.send("todo created");
    })
})

app.get('/get_todos', (req,res) =>{
    console.log("Fetching todos : ")
    var queryy = "SELECT * FROM todolist";

    connection.query(queryy,[req.params.id],(err,rows,fields) =>{
        if(err){
            console.log("Error :"+err);
            res.sendStatus(500);
            res.end();
        }
        console.log("Fetching user from database");
        res.json(rows);
    });
})

app.post('/delete_todo' ,(req,res) =>{
    var id=req.body.id;
    console.log("Trying to delete todo with id = "+id);
    const queryStr='DELETE FROM todolist WHERE id = ("'+id+'")';
    connection.query(queryStr, (err,rows,fiels)=>{
        if(err){
            console.log("Error : "+err);
            res.sendStatus(504);
        }
        console.log("deleted");
        res.send("todo deleted with id="+id);
    })
})

app.post('/update_todo' ,(req,res) =>{
    var id=req.body.id;
    var newname=req.body.newname;
    console.log("Trying to update todo with id = "+id);
    const queryStr="UPDATE todolist set todos = (?) WHERE id = (?)";
    connection.query(queryStr, [newname,id], (err,rows,fiels)=>{
        if(err){
            console.log("Error : "+err);
            res.sendStatus(504);
        }
        console.log("Inserted user");
        res.send("todo updated with id="+id);
    })
})


const PORT = process.env.PORT || 8888

app.listen(PORT, () =>{
    console.log("Server Running on :"+PORT);
})
