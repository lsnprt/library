let myLibrary = [];

class Book {
  constructor(title, author, pages, alreadyRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.alreadyRead = alreadyRead;
  }

  info() {
    return `${this.title} by ${this.author} is ${this.pages} pages long, ${
      this.alreadyRead ? 'has been' : 'not yet'
    } read`;
  }

  changeReadStatus() {
    this.alreadyRead = !this.alreadyRead;
  }
}

const lotr = new Book('Lord of The Rings', 'J.R.R. Tolkien', 1000, false);
const matilda = new Book('Matilda', 'R. Dahl', '100', true);
const vitaedottr = new Book(
  'Vita e Dottrina di Kant',
  'E. Cassirer',
  400,
  true
);

function addBook(library, book) {
  library.push(book);
}

addBook(myLibrary, lotr);
addBook(myLibrary, matilda);
addBook(myLibrary, vitaedottr);

function displayAllBooks(library) {
  library.forEach((b) => {
    console.log(b.info());
  });
}

displayAllBooks(myLibrary);
