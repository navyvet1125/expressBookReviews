const express = require('express');
const books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});


// Get the book list available in the shop
public_users.get('/', async (req, res) => res.status(200).send(books));

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  let isbn = req.params.isbn;
  let book = books.findBy("isbn", isbn)[0];
  return res.status(200).send(JSON.stringify(book, null, 2));
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  let author = req.params.author;
  let book = books.findBy("author", author);
  return res.status(200).send(JSON.stringify(book, null, 2));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  let title = req.params.title;
  let book = books.findBy("title", title)[0];
  return res.status(200).send(JSON.stringify(book, null, 2))
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  let book = books.findBy("isbn", req.params.isbn)[0];
  return res.status(200).send(JSON.stringify(book.reviews, null, 2));
});

module.exports.general = public_users;
