var mongoose = require('mongoose');

var bookScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String

    },
    description: {
        type: String,


    },
    author: {
        type: String

    },
    publiser: {
        type: String

    },
    pages: {
        type: Number

    },
    img_url: {
        type: String,

    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
var Book = module.exports = mongoose.model('Book', bookScheme);

//get genres
module.exports.getBooks = function (callback, limit) {
    Book.find(callback).limit(limit);
}

// 
module.exports.getBookById = function (id, callback) {
    Book.findById(id, callback);
};
module.exports.addBook = function (book, callback) {
    Book.create(book, callback);
};
module.exports.updateBook = function (id, book, options, callback) {
    var query = {
        _id: id
    };
    var update = {
        title: book.title,
        genre: book.genre,
        description: book.description,
        author: book.author,
        publiser: book.publiser,
        pages: book.pages,
        img_url: book.img_url

    }
    Book.findOneAndUpdate(query, update, options, callback);
};