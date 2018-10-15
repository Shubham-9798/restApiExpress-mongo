var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
    extended: false
}))
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

Genre = require('./models/genres');
Book = require('./models/books')
// connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore', {
    useNewUrlParser: true
});
var db = mongoose.connection;

app.get('/', function (req, res) {
    res.send('Hello World!!');
});

app.get('/api/genres', (req, res) => {
    Genre.getGenres(function (err, genres) {
        if (err) {
            throw err;
        }
        res.json(genres);
    })
});
//post genres
app.post('/api/genres', jsonParser, (req, res) => {
    var genre = req.body;
    if (!req.body) return res.sendStatus(400)
    // console.log(genre);
    // res.json(genre);
    Genre.addGenres(genre, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});
//update
app.put('/api/genres/:_id', jsonParser, (req, res) => {
    var id = req.params._id;
    var genre = req.body;
    if (!req.body) return res.sendStatus(400)
    // console.log(genre);
    // res.json(genre);
    Genre.updateGenres(id, genre, {}, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});
//delete genres
//update
app.delete('/api/genres/:_id', jsonParser, (req, res) => {
    var id = req.params._id;
    //var genre = req.body;
    if (!req.body) return res.sendStatus(400)
    // console.log(genre);
    // res.json(genre);
    Genre.deleteGenres(id, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

//==================
app.get('/api/books', (req, res) => {
    Book.getBooks(function (err, books) {
        if (err) {
            throw err;
        }
        res.json(books);
    })
});

app.get('/api/books/:_ id', (req, res) => {
    Book.getBookById(req.params._id, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    })
});
//post for book
app.post('/api/books', jsonParser, (req, res) => {
    var book = req.body;
    if (!req.body) return res.sendStatus(400); //authentication need
    // console.log(genre);
    // res.json(genre);
    Book.addBook(book, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});
//update
app.put('/api/books/:_id', jsonParser, (req, res) => {
    var id = req.params._id;
    var book = req.body;
    if (!req.body) return res.sendStatus(400)
    // console.log(genre);
    // res.json(genre);
    Book.updateBook(id, book, {}, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

app.listen(3000);
console.log('Running at the 3000');