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

function addBook(library, book) {
  book.id = idGenerator++;
  library.push(book);
}

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
  <span>
  <label for="book${book.id}">Read?</label>
  <input type="checkbox" name="alreadyRead" id="book${book.id}"
  ${book.alreadyRead ? 'checked' : ''} />
  </span>
  <button id="remove${book.id}">Remove book</button>`;

  const bookContainer = document.querySelector('.books-container');
  bookContainer.insertBefore(card, bookContainer.firstChild);

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

  // Reset form
  e.target.title.value = '';
  e.target.author.value = '';
  e.target.pages.value = '';
  e.target.alreadyRead.value = undefined;

  // Close modal
  const addBookWrapper = document.querySelector('.add-book-wrapper');
  addBookWrapper.style.display = 'none';
});

const addBookButton = document.querySelector('#add-book > button');
addBookButton.addEventListener('click', () => {
  const addBookWrapper = document.querySelector('.add-book-wrapper');
  addBookWrapper.style.display = 'block';

  window.addEventListener('click', (e) => {
    if (e.target === addBookWrapper) {
      addBookWrapper.style.display = 'none';
    }
  });
});
