let myLibrary = [];
let idGenerator = 0;

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
  book.id = idGenerator++;
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

function setupEventListeners(id) {
  const checkbox = document.querySelector(`#book${id}`);
  checkbox.addEventListener('change', () => {
    myLibrary.find((book) => book.id === id).changeReadStatus();
  });

  const removeButton = document.querySelector(`#remove${id}`);
  removeButton.addEventListener('click', (event) => {
    myLibrary = myLibrary.filter((book) => book.id !== id);

    const divToRemove = event.target.parentNode;
    for (let i = divToRemove.childElementCount; i > 0; i--) {
      divToRemove.removeChild(divToRemove.lastChild);
    }

    divToRemove.remove();
  });
}

function createBookCard(book) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('id', book.id);

  // Attempt at doing something React-like with the limitations of vanilla JS
  card.innerHTML = `<h2>${book.title}</h2>
  <p>${book.author}</p>
  <p>${book.pages} pages</p>
  <input type="checkbox" name="alreadyRead" id="book${book.id}"
  ${book.alreadyRead ? 'checked' : ''} />
  <label for="book${book.id}">Read?</label>
  <button id="remove${book.id}">Remove book</button>`;

  const bookContainer = document.querySelector('.books-container');
  bookContainer.appendChild(card);

  setupEventListeners(book.id);
}

const addBookForm = document.querySelector('.add-book-form');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const alreadyRead = e.target.alreadyRead.value;

  const bookToAdd = new Book(title, author, pages, alreadyRead);
  addBook(myLibrary, bookToAdd);

  createBookCard(bookToAdd);
});
