const addBtn = document.getElementById('add');
const booksList = JSON.parse(localStorage.getItem('books'));

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const book = {
    Title: title.value,
    Author: author.value,
  };
  const list = document.getElementById('book-list');
  const addDiv = document.createElement('div');
  addDiv.classList.add('book');
  booksList.push(book);
  localStorage.setItem('books', JSON.stringify(booksList));
  addDiv.innerHTML += `
  <p>${book.Title}</p>
  <p>${book.Author}</p>
  <button class="delete button">Remove</button>
  <hr>
  `;
  list.appendChild(addDiv);
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});

document.getElementById('book-list').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
  booksList.forEach((book, i) => {
    if (e.target.parentElement.firstElementChild.textContent === book.Title) {
      booksList.splice(i, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(booksList));
});

window.addEventListener('load', () => {
  const stores = JSON.parse(localStorage.getItem('books'));
  stores.forEach((store) => {
    const addDiv = document.createElement('div');
    addDiv.innerHTML += `
    <p>${store.Title}</p>
    <p>${store.Author}</p>
    <button class="delete button">Remove</button>
    <hr>      
    `;
    const list = document.getElementById('book-list');
    list.appendChild(addDiv);
  });
});