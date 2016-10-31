var express = require('express');

var app = express();

var book = require('./services/book.js')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/books/:bookId', function(req, res) {

    book.listOne(req.params.bookId)
        .then(function(rows) {
            res.json(rows);
        })

    .catch(function() {
        res.sendStatus(500);
    });
});

app.get('/books', function(req, res) {

    book.list()
        .then(function(rows) {
            res.json(rows);
        })

    .catch(function() {
        res.sendStatus(500);
    });
});

app.post('/books', function(req, res) {

    var bookData = {
        id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        description: req.body.description,
        category: req.body.category,
        picture: req.body.picture,
        price: req.body.price

    };
    book.create(bookData)
        .then(function(result) {
            res.json({
                id: result.insertId,
                name: bookData.name,
                author: bookData.author,
                releaseDate: bookData.releaseDate,
                description: req.body.description,
                category: req.body.category,
                picture: req.body.picture,
                price: req.body.price
            });
        })

    .catch(function() {
        res.sendStatus(500);
    });
});

app.put('/books/:bookId', function(req, res) {

    var bookData = {
        name: req.body.name,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        description: req.body.description,
        category: req.body.category,
        picture: req.body.picture,
        price: req.body.price
    };

    book.update(req.params.bookId, bookData)
        .then(function(result) {
            res.json({
                id: result.insertId,
                name: bookData.name,
                author: bookData.author,
                releaseDate: bookData.releaseDate,
                description: req.body.description,
                category: req.body.category,
                picture: req.body.picture,
                price: req.body.price

            });
        })

    .catch(function() {
        res.sendStatus(500);
    });
});

app.delete('/books/:bookId', function(req, res) {

    book.destroy(req.params.bookId)
        .then(function(result) {
            res.json(result.affectedRows);
        })

    .catch(function() {
        res.sendStatus(500);
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
