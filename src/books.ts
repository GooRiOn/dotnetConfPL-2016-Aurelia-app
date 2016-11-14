export class BooksViewModel
{
    books: Book[];
    newBook: Book;

    constructor()
    {
        this.books = [];
        this.newBook = new Book();
    }


    addBook()
    {
        this.books.push(this.newBook);
        this.newBook = new Book();
    }

    removeBook(book: Book)
    {
        let bookIndex = this.books.indexOf(book);

        if(~bookIndex)
            this.books.splice(bookIndex, 1);
    }

    changeBookAvailability(book: Book)
    {
        book.isAvailable = !book.isAvailable;
    }
}

export class Book
{
    title: string;
    author: string;
    isAvailable: boolean;

    constructor()
    {
        this.isAvailable = true;
    }
}