const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(cookieParser())

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}))

mongoose.connect("mongodb+srv://admin-michael:michaelthe23@cluster0.c9aqh.mongodb.net/Weeblist?retryWrites=true&w=majority", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.get('/login', (req, res) => {
    if (req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }
    else {
        res.send({loggedIn: false})
    }
})

app.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, function(err, foundUser){
        if (err){
            console.log(err)
        }
        else {
            if (foundUser){
                bcrypt.compare(req.body.password, foundUser.password, function(err, result){
                    if (result === true){
                        // passport.authenticate("local")(req, res, function(){
                        console.log('Successful')
                        req.session.user = foundUser
                        console.log(req.session.user)
                        res.send(foundUser)
                        // res.send({loggedIn: true, user:req.session.user})
                        // })
                    }
                })
            }
        }
    })
})

app.listen(3001, function(){
    console.log('Server started on port 3001.')
})