const express = require("express");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

const secreatKey = 'secreatKey';


//to get all data
app.get('/', (req,res) => {
    let sql = 'SELECT * FROM users' ;
    let query = db.query(sql, (err, result) =>{
        if (err) throw err;
        res.send(result);
    });
})

app.post('/registerpage', (req,res) => {
    const sql = 'INSERT INTO users (`name`,`email`,`password`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]

    db.query(sql,[values], (err, result)=> {
        if(err){
            res.send(err);
        }
        jwt.sign({result}, secreatKey, {expiresIn:'1d'}, (err,token) => {
                if(err){
                    res.send({result: "something went wrong"})
                }
                res.send({token});
                console.log('reg', {token});
                console.log('values', result);
            })
    })
})


app.get('/dashboard', verifyToken, (req,res) => {
    jwt.verify(req.token, secreatKey, (err, token) => {
        if(err){
            res.send({
                Message: "Invalid Token",
                err
            });
        } else {
            console.log({token});
            res.json({
                Message: "Token Validated successfully",
                token
            })
        }
    })
});

app.get('/moviepage', verifyToken, (req,res) => {
    jwt.verify(req.token, secreatKey, (err, token) => {
        if(err){
            res.send({
                Message: "Invalid Token"
            });
        } else {
            console.log({token});
            res.json({
                Message: "Token Validated successfully",
                token
            })
        }
    })
});


app.post('/loginpage',(req,res) => {
    const sql = 'SELECT * FROM users where `email` = ? AND `password` = ?';

    db.query(sql,[req.body.email, req.body.password], (err, data)=> {
        if(err){
            res.json("err");
        }
        const user = data[0];
        if(data.length>0){
            jwt.sign({user}, secreatKey, {expiresIn:'5s'}, (err,token) => {
                if(err){
                    res.send({result: "something went wrong"})
                }
                res.send({token});
                console.log({token});
            })
        }else {
            return res.json('Error');

        }
    })
    
})

function verifyToken(req,res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const token = bearer[1];
        req.token = token;
        console.log("middleware called", token);
        
        next();
    }
    else{
        res.send({
            Message: "Please pass the auth token"
        });
    }
}


//delete  users
app.get('/deleteuser/:id',(req,res) => {
    let sql = `DELETE FROM users where id= ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if (err) throw err;
        res.send(result);
    });
});
app.listen('8080', () => {
    console.log('server started');
}) 