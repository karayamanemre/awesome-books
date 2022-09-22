const booksList = [];
const addBtn = document.getElementById('add-btn');

class Display {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }

  static addBook() {
    const Title = document.getElementById('title').value;
    const Author = document.getElementById('author').value;
    const list = document.getElementById('book-list');
    const addDiv = document.createElement('div');
    addDiv.classList.add('book');
    const newBook = new Display(Title, Author);
    booksList.push(newBook);
    addDiv.innerHTML += `
    <span>"${newBook.title}" by ${newBook.author}</span>
    <button class= "delete button ${newBook.id}">Remove</button>
    `;
    list.appendChild(addDiv);
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }

  static addToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(booksList));
  }

  static removeBook(e) {
    e.preventDefault();
    if (e.target.innerHTML === 'Remove') {
      e.target.parentElement.remove();
    }
  }

  static removeFromLocalStorage(e) {
    booksList.forEach((newBook, i) => {
      if (e.target.parentElement.lastElementChild.classList.contains(newBook.id)) {
        booksList.splice(i, 1);
        console.log('here');
      }
    });
    localStorage.setItem('books', JSON.stringify(booksList));
  }

  static keepLocalStorage() {
    const stores = JSON.parse(localStorage.getItem('books'));
    stores.forEach((store) => {
      const addDiv = document.createElement('div');
      addDiv.classList.add('book');
      booksList.push(store);
      addDiv.innerHTML += `
      <span>"${store.title}" by ${store.author}</span>
      <button class= "delete button ${store.id}">Remove</button>
      `;
      const list = document.getElementById('book-list');
      list.appendChild(addDiv);
    });
  }
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  Display.addBook();
  Display.addToLocalStorage();
});
document.getElementById('book-list').addEventListener('click', (e) => {
  e.preventDefault();
  Display.removeBook(e);
  Display.removeFromLocalStorage(e);
});
window.addEventListener('load', () => {
  Display.keepLocalStorage();
});

const date = document.getElementById('date');
const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');
const listSection = document.querySelector('.list-section');
const addSection = document.querySelector('.add-section');
const contactSection = document.querySelector('.contact-section');

function showDateTime() {
  let d = new Date();
  date.innerHTML = d.toLocaleString('en-GB');
}
showDateTime();
setInterval(showDateTime, 1);

listLink.addEventListener('click', () => {
  listSection.style.display = 'flex';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
});

addLink.addEventListener('click', () => {
  listSection.style.display = 'none';
  addSection.style.display = 'flex';
  contactSection.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  listSection.style.display = 'none';
  addSection.style.display = 'none';
  contactSection.style.display = 'flex';
});