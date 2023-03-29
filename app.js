//Book Constructor
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


//UI constructor
function UI() { }

//Store constuctor
function Store(){ }

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  //create tr element
  const row = document.createElement('tr');
  //inset cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X</a></td>`;
  list.appendChild(row);

}
//clear fields
UI.prototype.clearFields=function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  
}

//UI delete book from the list
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}


UI.prototype.showAlert = function (message, className) {
  //create div
  const div=document.createElement('div');
  //add class name
  div.className = `alert ${className}`;
  //create text node
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector('.container');
  //get form
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);
  
  //set timeout
  setTimeout(function () {
    document.querySelector('.alert').remove();
    
  }, 3000);
  
}
//Local storage getBooks
Store.prototype.getBooks = function () {
  let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
} 
//local storage addBook
Store.prototype.addBook = function (book) {
   const store = new Store();
  const books = store.getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

//local storage displayBooks
Store.prototype.displayBooks = function () {
   const store = new Store();
  const books = store.getBooks();
  books.forEach(function(book){
  //instantiate UI
  const ui = new UI;
  //add book
  ui.addBookToList(book);
      
    });
}

//local storage removeBook
Store.prototype.removeBook = function (isbn) {
  const store = new Store();
  const books = store.getBooks();
    books.forEach(function(book,index){
      if (book.isbn === isbn) {
        books.splice(index, 1);
    } 
    });
    localStorage.setItem('books', JSON.stringify(books)); 
}

//DOMload event
const store = new Store();
document.addEventListener('DOMContentLoaded', store.displayBooks);

//event listener for adding book
document.getElementById('book-form').addEventListener('submit', function (e) {
  //console.log('test');
  //Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  //console.log(title, author, isbn);
  //instantiate book constructor
  const book = new Book(title, author, isbn);
  //console.log(book);

  //instantiate UI constructor
  const ui = new UI();

  if (title == '' || author == '' || isbn == '') {
    ui.showAlert('please fill all the fields', 'error');
  } else {
  // add book to the list
    ui.addBookToList(book);
    
    //add to local storage
    const store = new Store();
    store.addBook(book);

  // show success message
    ui.showAlert('Book added!', 'success');  
    
  //clear fields
  ui.clearFields();
    
}

 

  e.preventDefault();
})

//DOMload event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//EVENT listner for delete
document.getElementById('book-list').addEventListener('click', function(e){
  

  //instantiate UI constructor
  const ui = new UI();
  ui.deleteBook(e.target);

  //remove from ls
  const store = new Store();
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show alert
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
})
