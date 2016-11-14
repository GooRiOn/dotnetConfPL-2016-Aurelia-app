import {HttpClient} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-dependency-injection';

@autoinject()
export class SearchViewModel
{
    bookId: number;
    book: any;

    constructor(private httpClient : HttpClient)
    {
        this.httpClient.configure(config => 
        {
            config.withBaseUrl('http://localhost:64857/');
        });
    }
    
    activate() 
    {
        this.bookId = 1;
        this.searchBookById();
    }

    deactivate() 
    {
        alert('CYA!')
    }

    searchBookById()
    {
        let url = `api/Books/${this.bookId}`;
        this.httpClient.fetch(url).then(response => response.json()).then(response => 
        {
            this.book = response.book;
        });
    }
}