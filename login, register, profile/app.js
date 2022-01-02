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
    password: String,
    gender: String,
    joined: String
});

const watchlistSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    animeID:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Planned"
    }
});

const ratingSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    animeID:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const User = new mongoose.model("User", userSchema);
const Watchlist = new mongoose.model('Watchlist', watchlistSchema)
const Rating = new mongoose.model('Rating', ratingSchema)

app.get('/login', (req, res) => {
    if (req.session.user){
        console.log(req.session)
        res.send({loggedIn: true})
    }
    else {
        res.send({loggedIn: false})
    }
})

let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

app.post('/register', (req, res) => {
    let date = new Date();
    date = date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear()
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
                    password: hash,
                    gender: "-",
                    joined: date
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
                            res.send({loggedIn: true, message: 'Login successful'})
                        }
                        else {
                            res.send({loggedIn: false, message: 'Login unsuccessful'})
                        }
                    })
                }
                else {
                    res.send({loggedIn: false, message: 'Login unsuccessful'})
                }
            }
        })
    }
})

app.post('/updateprofile', (req, res) => {
    User.findOne({username: req.session.user.username}, (err, foundUser) => {
        if (!err && foundUser){
            let unique = true
            User.findOne({username: req.body.username}, (err, foundUser) => {
                if (!err && foundUser){
                    unique = false
                }
            })
            if (unique || (!unique && req.session.user.username === req.body.username)){
                foundUser.name = req.body.name
                foundUser.email = req.body.email
                foundUser.username = req.body.username
                if (req.body.gender === 'female bg-dark'){
                    foundUser.gender = 'Female'
                }
                else if (req.body.gender === 'male bg-dark'){
                    foundUser.gender = 'Male'
                }
                else {
                    foundUser.gender = '-'
                }
                foundUser.save(function(err){
                    if (err){
                        res.send({message: 'Update unsuccessful'})
                    }
                    else {
                        req.session.user = foundUser
                        res.send({message: 'Update successful'})
                    }
                })
            }
            else {
                res.send({message: 'Username must be unique'})
            }
        }
        else {
            res.send({message: 'Update unsuccessful'})
        }
    })
})

app.get('/updateprofile', (req, res) => {
    User.findOne({username: req.session.user.username}, (err, foundUser) => {
        if (!err && foundUser){
            res.send({name: foundUser.name, email: foundUser.email, username: foundUser.username, gender: foundUser.gender})
        }
    })
})

app.post('/changepassword', (req, res) => {
    let newPassword = req.body.newPassword
    let oldPassword = req.body.oldPassword
    let confirmPassword = req.body.confirmPassword

    if (newPassword.length < 8 || confirmPassword.length < 8 || oldPassword.length < 8){
        res.send({message: 'The password inputted must be more than 8 characters'})
    }
    else {
        User.findOne({username: req.session.user.username}, (err, foundUser) => {
            if (!err && foundUser){
                if (req.body.newPassword === req.body.confirmPassword){
                    bcrypt.compare(req.body.oldPassword, foundUser.password, function(err, result){
                        if (!err && result === true){
                            bcrypt.hash(req.body.newPassword, 10, function(err, hash){
                                if (err){
                                    res.send({changePassword: false, message: 'Change password successful'})
                                }
                                else {
                                    foundUser.password = hash
                                    foundUser.save(function(err){
                                        if (err){
                                            res.send({message: 'Change password unsuccessful'})
                                        }
                                        else {
                                            req.session.user = foundUser
                                            res.send({message: 'Change password successful'})
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            res.send({message: 'Change password unsuccessful'})
                        }
                    })
                }
                else {
                    res.send({message: 'New Password and Confirm Password must be the same'})
                }
            }
            else {
                res.send({message: 'Update unsuccessful'})
            }
        })
    }
})

app.get('/getprofile', (req, res) => {
    if (!req.session.user){
        res.send({message: 'You need to login first'})
    }
    else {
        res.send({name: req.session.user.name, username: req.session.user.username, gender: req.session.user.gender, joined: req.session.user.joined})
    }
})

app.get('/dashboard', (req, res) => {
    let watchlist = 0, finished = 0, watching = 0, planned = 0, review = 0, hours = 0
    Watchlist.find({userID: req.session.user._id}, (err, foundWatchlist) => {
        if (!err && foundWatchlist){
            watchlist = foundWatchlist.length
        }
    })
    Watchlist.find({userID: req.session.user._id, status: 'Finished'}, (err, foundWatchlist) => {
        if (!err && foundWatchlist){
            finished = foundWatchlist.length
        }
    })
    Watchlist.find({userID: req.session.user._id, status: 'Watching'}, (err, foundWatchlist) => {
        if (!err && foundWatchlist){
            watching = foundWatchlist.length
        }
    })
    Watchlist.find({userID: req.session.user._id, status: 'Planned'}, (err, foundWatchlist) => {
        if (!err && foundWatchlist){
            planned = foundWatchlist.length
        }
    })
    Rating.find({userID: req.session.user._id}, (err, foundRating) => {
        if (!err && foundRating){
            review = foundRating.length
        }
    })
    res.send({watchlist: watchlist, finished: finished, watching: watching, planned: planned, review: review, hours: hours})
})

app.listen(3001, function(){
    console.log('Server started on port 3001.')
})