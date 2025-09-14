let myLibrary = [];
const bookshelfDiv = document.body.querySelector('.bookshelf');

function generateRandomPastelColor() {
  const hue = Math.floor(Math.random() * 361); // Random hue (0-360)
  const saturation = Math.floor(Math.random() * 30) + 70; // Moderate saturation (70-99%)
  const lightness = Math.floor(Math.random() * 15) + 80; // High lightness (80-94%)

  return `hsl(${hue}deg, ${saturation}%, ${lightness}%)`;
}

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(`Added book: ${newBook.title} with ID: ${newBook.id}`);
    displayBooks();
}

function displayBooks() {
    bookshelfDiv.innerHTML = '';
    
    Object.values(myLibrary).forEach(newBook => { 
        const newCard = document.createElement('div');
        const bookTitle = document.createElement('h3');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');
        const bookRead = document.createElement('p');
        const readButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        const readStatusText = newBook.read ? "Yes" : "No";
        newCard.dataset.bookId = newBook.id;
        newCard.className = 'book-card';
        bookTitle.className = 'book-title';
        bookAuthor.className = 'book-author';
        bookPages.className = 'book-pages';
        readButton.classList.add('button', 'read-button');
        deleteButton.classList.add('button', 'delete-button');
        readButton.textContent = 'Change Read Status'
        deleteButton.textContent = 'Delete';
        bookTitle.textContent = `${newBook.title}`;
        bookAuthor.textContent = `${newBook.author}`;
        bookPages.textContent = `${newBook.pages} pages`;
        bookRead.textContent = `Have you read this book? ${readStatusText}`;
        newCard.appendChild(deleteButton);
        newCard.appendChild(bookTitle);
        newCard.appendChild(bookAuthor);
        newCard.appendChild(bookPages);
        newCard.appendChild(bookRead);
        newCard.appendChild(readButton);
        newCard.style.backgroundColor = generateRandomPastelColor();
        bookshelfDiv.appendChild(newCard);
});
}

addBookToLibrary('The Outsider','Stephen King', 576, 'Yes');
addBookToLibrary("The Witch's Heart", 'Genevieve Gornichec', 370, "No");
addBookToLibrary('The Outsider','Stephen King', 576, 'Yes');
addBookToLibrary("The Witch's Heart", 'Genevieve Gornichec', 370, "No");
addBookToLibrary('The Outsider','Stephen King', 576, 'Yes');
addBookToLibrary("The Witch's Heart", 'Genevieve Gornichec', 370, "No");


document.addEventListener('DOMContentLoaded', () => {
    const newBookBtn = document.getElementById('new-book-btn');
    const newBookDialog = document.getElementById('new-book-dialog');
    const newBookForm = document.getElementById('new-book-form');
    const cancelBtn = document.getElementById('cancel-btn');

    // Show the non-modal dialog
    newBookBtn.addEventListener('click', () => {
        newBookDialog.show();
    });

    // Close the dialog when the Cancel button is clicked
    cancelBtn.addEventListener('click', () => {
        newBookDialog.close();
    });

    // Handle form submission (e.g., to process the data)
    newBookForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default dialog form submission

        // Get form values.
        const checkbox = document.getElementById('read'); // Replace 'myCheckbox' with your checkbox's ID
        let checkedStatus;

        if (checkbox.checked) {
        checkedStatus = 'Yes';
        } else {
        checkedStatus = 'No';
        }

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = checkedStatus;
    
        // Call the function to add the book to the library.
        addBookToLibrary(title, author, pages, read);

        // Reset the form
        newBookForm.reset();

        // Close the dialog after submission
        newBookDialog.close();
    });
});

function removeBook(bookId) {
  // 1. Confirm the user wants to delete the book
    if (window.confirm('Are you sure you want to delete this book?')) {
  
        // 2. Remove the book from the myLibrary array
    myLibrary = myLibrary.filter(book => book.id !== bookId);

  // 3. Remove the book card from the DOM
    const bookCard = document.querySelector(`[data-book-id="${bookId}"]`);
    if (bookCard) {
        bookCard.remove();
    }
  // 4. If the user cancels the book deletion, it's reported in the console  
    } else {
    console.log("Book deletion cancelled")
    }
}

function toggleReadStatus(bookId) {
    const bookToToggle = myLibrary.find(book => book.id === bookId);
    if (bookToToggle) {
        bookToToggle.read = !bookToToggle.read;
    }
    displayBooks();
}

bookshelfDiv.addEventListener('click', (event) => {
  // Check if the clicked element has the 'remove-book-btn' class
  if (event.target.classList.contains('delete-button')) {
    // Traverse up to find the parent book card
    const bookCard = event.target.closest('.book-card');
    const bookId = bookCard.dataset.bookId;
    removeBook(bookId);
  }

  if (event.target.classList.contains('read-button')) {
    const bookCard = event.target.closest('.book-card');
    const bookId = bookCard.dataset.bookId;
    toggleReadStatus(bookId);
  }
});