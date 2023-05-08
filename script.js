const myLibrary = [];

class Book {
  constructor(title, author, pages, alreadyRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.alreadyRead = alreadyRead;
  }

  // Test method
  info() {
    return `${this.title} by ${this.author} is ${this.pages} pages long, ${
      this.alreadyRead ? 'has been' : 'not yet'
    } read`;
  }

  changeReadStatus() {
    this.alreadyRead = !this.alreadyRead;
  }
}

// Fake Database for myLibrary, data may not be accurate for the books
const lotr = new Book('Lord of The Rings', 'J.R.R. Tolkien', 1000, false);
const matilda = new Book('Matilda', 'R. Dahl', '100', true);
const vitaedottr = new Book(
  'Vita e Dottrina di Kant',
  'E. Cassirer',
  400,
  true
);

function addBook(library, book) {
  book.id = library.length;
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

const addBookForm = document.querySelector('.add-book-form');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e);

  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const alreadyRead = e.target.alreadyRead.value;

  const bookToAdd = new Book(title, author, pages, alreadyRead);
  addBook(myLibrary, bookToAdd);
});

function createBookCard(book) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('id', book.id);

  const cardHeader = document.createElement('h2');
  cardHeader.innerText = book.title;
  card.appendChild(cardHeader);

  const cardBodyAuthor = document.createElement('p');
  cardBodyAuthor.innerText = book.author;
  card.appendChild(cardBodyAuthor);

  const cardBodyPages = document.createElement('p');
  cardBodyPages.innerText = `${book.pages} pages`;
  card.appendChild(cardBodyPages);

  const bookContainer = document.querySelector('.books-container');
  bookContainer.appendChild(card);
}
