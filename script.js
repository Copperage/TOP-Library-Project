const form = document.querySelector('#form');

let bookLibrary = [];

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = `Written by ${author}`;
		this.pages = `${pages} pages`;
		this.read = read;
	}

	toggleReadStatus() {
		this.read = !this.read;
	}
}

function displayLibrary() {
	const libraryList = document.querySelector('.book-list-container');

	libraryList.innerHTML = '';

	bookLibrary.forEach((book) => {
		let bookList = document.createElement('ul');
		bookList.classList.add('card');

		const removeButtonContainer = document.createElement('div');
		removeButtonContainer.classList.add('remove-button-container');

		let removeButton = document.createElement('button');
		removeButton.textContent = 'X';
		removeButton.addEventListener('click', () => {
			removeBookFromLibrary(book);
			bookList.remove();
		});

		const readCheckbox = document.createElement('input');
		readCheckbox.type = 'checkbox';
		readCheckbox.checked = book.read;
		readCheckbox.addEventListener('change', () => {
			book.toggleReadStatus();
			displayLibrary();
		});

		bookList.innerHTML = `
		<li>${book.title}</li>
		<li>${book.author}</li>
		<li>${book.pages}</li>
		<li>${book.read ? 'Read' : 'Not read'}</li>
	  `;

		bookList.children[3].appendChild(readCheckbox);
		removeButtonContainer.appendChild(removeButton);
		bookList.appendChild(removeButtonContainer);
		libraryList.appendChild(bookList);
	});
}

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	bookLibrary.push(newBook);
	displayLibrary();
}

function removeBookFromLibrary(book) {
	bookLibrary.splice(book, 1);
	displayLibrary();
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const pages = document.querySelector('#pages').value;
	const read = document.querySelector('#read').checked;
	addBookToLibrary(title, author, pages, read);
});

displayLibrary();
