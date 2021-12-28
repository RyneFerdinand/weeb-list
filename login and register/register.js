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

// const genreSchema = {
//     genreID: Number,
//     genreName: String
// }

const User = new mongoose.model("User", userSchema);
// const Genre = mongoose.model("Genre", genreSchema);

app.post('/register', (req, res) => {
    // User.create({name: req.body.name, username: req.body.username, email: req.body.email, password: req.body.password})
    bcrypt.hash(req.body.password, 10, function(err, hash){
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        newUser.save(function (err){
            if (err){
                console.log(err)
            }
            else {
            }
        })
    })
})

app.listen(3000, function(){
    console.log('Server started on port 3000.')
    // for (let i = 0; i < genres.length; i++){
    //     Genre.create({genreID: genres[i].genreID, genreName: genres[i].genreName})
    // }
})