/*  App Name     : FavouriteBook List - books.js
    Author       :
    Edited by    : Tarik Obeidi
    ID           : 301252585
*/

// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

    /*****************
    * ADD CODE HERE *
    *****************/
   
     res.render('index', { title: 'Add Book', page: '/books/edit', book: {}});

}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/

    // Composing a new book document 
     let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    // Adding a new document to the database
    booksModel.create(newBook, (err, Book) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/books/list')
    } )
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/

     let id = req.params.id;
     // Pulling the book document to edit from the database
     booksModel.findById(id, (err, book) => {
         if(err){
             console.error(err);
             res.end(err);
         }
 
         res.render('index', { title: 'Edit Book', page: '/books/edit', book: book });
     });    
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    /*****************
    * ADD CODE HERE *
    *****************/

     let id = req.params.id;
     // Updating the book document attributes from the entered changes
     let newBook = booksModel({
         _id: req.body.id,
         name: req.body.name,
         author: req.body.author,
         published: req.body.published,
         description: req.body.description,
         price: req.body.price
     });
     // Updating the changed document into the database
     booksModel.updateOne({_id: id }, newBook, (err, Book) => {
         if(err){
             console.error(err);
             res.end(err);
         };
 
         res.redirect('/books/list')
     } )

}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    /*****************
    * ADD CODE HERE *
    *****************/
    let id = req.params.id;
    
    // Deleting the target book document from the database
    booksModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/books/list');
    }) 
}