class Book{
  constructor(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
   }
}

class UI{
  addBookToList(book) {
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
  showAlert(message,className) {
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
  deleteBook(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
  }
  clearFields(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  }
}

//local storage class
class Store{
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book){
      //instantiate UI
      const ui = new UI;
      //add book
      ui.addBookToList(book);
      
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
     const books = Store.getBooks();
    books.forEach(function(book,index){
      if (book.isbn === isbn) {
        books.splice(index, 1);
    } 
    });
    localStorage.setItem('books', JSON.stringify(books)); 
  }
}
//DOMload event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
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
    Store.addBook(book);
    

  // show success message
    ui.showAlert('Book added!', 'success');  
    
  //clear fields
  ui.clearFields();
    
}

 

  e.preventDefault();
})

//EVENT listner for delete
document.getElementById('book-list').addEventListener('click', function(e){
  

  //instantiate UI constructor
  const ui = new UI();
  ui.deleteBook(e.target);
  //remove from ls
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //show alert
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
})
