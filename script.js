const booksList = JSON.parse(localStorage.getItem('books'));

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

  static From(e) {
    booksList.forEach((newBook, i) => {
      if (e.target.parentElement.lastElementChild.classList.contains(newBook.id)) {
        booksList.splice(i, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(booksList));
  }

  static keepLocalStorage() {
    const stores = JSON.parse(localStorage.getItem('books'));
    stores.forEach((store) => {
      const addDiv = document.createElement('div');
      addDiv.classList.add('book');
      addDiv.innerHTML += `
      <span>"${store.title}" by ${store.author}</span>
      <button class= "delete button ${store.id}">Remove</button>
      `;
      const list = document.getElementById('book-list');
      list.appendChild(addDiv);
    });
  }
}

const addBtn = document.getElementById('add');

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