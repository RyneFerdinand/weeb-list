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
        res.send({loggedIn: true})
    }
    else {
        res.send({loggedIn: false})
    }
})

app.post('/register', (req, res) => {
    let name = req.body.name
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let checkbox = req.body.checkbox
    let unique = true
    User.findOne({username: username}, function(err, foundUser){
        if (err || foundUser){
            unique = false
        }
    })

    if (name.length == 0 || username.length == 0 || password.length == 0 || email.length == 0){
        res.send({message: "All data must be inputted"})
    }
    else if (password.length < 8){
        res.send({message: "Password must be more than 8 characters"})
    }
    else if (!unique){
        res.send({message: "Username must be unique"})
    }
    else if (!email.includes('@')){
        res.send({message: "Email must contain @ character"})
    }
    else if (!checkbox){
        res.send({message: "Checkbox must be ticked"})
    }
    else {
        bcrypt.hash(password, 10, function(err, hash){
            if (err){
                res.send({registeredIn: false, message: "Register unsuccessful"})
            }
            else {
                const newUser = new User({
                    name: name,
                    username: username,
                    email: email,
                    password: hash
                })
                newUser.save(function (err){
                    if (err){
                        res.send({registeredIn: false, message: "Register unsuccessful"})
                    }
                    else {
                        res.send({registeredIn: true, message: "Register successful"})
                    }
                })
            }
        })
    }
})

app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (username.length == 0 || password.length == 0){
        res.send({message: "All data must be inputted"})
    }
    else {
        User.findOne({username: username}, function(err, foundUser){
            if (err){
                res.send({loggedIn: false, message: 'Login unsuccessful'})
            }
            else {
                if (foundUser){
                    bcrypt.compare(password, foundUser.password, function(err, result){
                        if (!err && result === true){
                            // console.log('Successful')
                            req.session.user = foundUser
                            // console.log(req.session.user)
                            res.send({loggedIn: true, message: 'Login successful'})
                        }
                        else {
                            res.send({loggedIn: false, message: 'Login unsuccessful'})
                        }
                    })
                }
            }
        })
    }
})

app.listen(3001, function(){
    console.log('Server started on port 3001.')
})