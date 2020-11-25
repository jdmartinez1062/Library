const myLibrary = [];

const library = (() => {
  const findObject = (k) => {
    for (let i = 0; i < myLibrary.length; i += 1) {
      // eslint-disable-next-line eqeqeq
      if (myLibrary[i].id === parseInt(k, 10)) {
        return myLibrary[i];
      }
    }
    return null;
  };
  const addBookToLibrary = (book) => {
    myLibrary.push(book);
  };
  // eslint-disable-next-line no-unused-vars
  const deleteArray = (index) => {
    const book = findObject(index);
    index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
  };
  return {
    addBookToLibrary,
    deleteArray,
    findObject,
  };
})();
class Book {
  constructor(title, author, numberPages, read, id) {
    this.title = title;
    this.author = author;
    this.numberPages = numberPages;
    this.read = read;
    this.id = id;
  }

  checkRead() {
    if (this.read === true) {
      return 'already read';
    }
    return 'not read yet';
  }

  oppositeStatus() {
    if (this.read === true) {
      return 'Change to "Not read yet"';
    }
    return 'Change to "Read"';
  }

  toggleRead() {
    this.read = !this.read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.numberPages} pages, ${this.checkRead(this.read)}.`;
  }
}

const a = new Book('Harry Potter', 'IDK', 300, true, 0);
const b = new Book('Rails', 'IDK', 300, true, 1);


function checkFirstId(element) {
  if (element.length === 0) {
    return 0;
  }
  return element[element.length - 1].id + 1;
}

function changeReadValue(value) {
  if (value === 'true') {
    return true;
  }
  return false;
}

function newBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  let read = document.getElementById('read').value;
  const id = checkFirstId(myLibrary);
  read = changeReadValue(read);
  const bookNew = new Book(title, author, pages, read, id);
  library.addBookToLibrary(bookNew);
  const form = document.getElementById('form');
  form.classList.toggle('hidden');
  // eslint-disable-next-line no-undef
  update(myLibrary[myLibrary.length - 1]);
}


function showForm() {
  const form = document.getElementById('form');
  form.classList.toggle('hidden');
}


document.getElementById('btn-library').addEventListener('click', newBook);

document.getElementById('new-book').addEventListener('click', showForm);

function deleteDiv(e) {
  e = e.target || e.srcElement;
  const b = e.id;
  const k = b.substring(7, b.length);
  // eslint-disable-next-line no-undef
  deleteBook(k);
}

library.addBookToLibrary(a);
library.addBookToLibrary(b);
// eslint-disable-next-line no-undef
displayBooks(myLibrary);

const objects = Array.from(document.getElementsByClassName('delete'));
const objectsRead = Array.from(document.getElementsByClassName('read'));

for (let i = 0; i < objects.length; i += 1) {
  document.getElementById(objects[i].id).addEventListener('click', deleteDiv);
  // eslint-disable-next-line no-loop-func
  document.getElementById(objectsRead[i].id).addEventListener('click', (e) => {
    e = e.target;
    const b = e.id;
    const k = b.substring(11, b.length);
    const object = library.findObject(k);
    object.toggleRead();
    // eslint-disable-next-line no-undef
    updateReadStatus(object);
  });
}
