# Book Finder App
An application that will allow users to search for books by entering a query (Title, Author, etc). Display the resulting books in a list on the page with all the corresponding data.

## Getting Started
These instructions will help you run the application locally. You must have node installed to run this application.
```
$ git clone https://github.com/sukwonchoi/book-finder.git
$ cd book-finder
$ npm install
$ npm start
```
## Built With
* [react](https://reactjs.org/) - The web framework used
* [TypeScript](https://www.typescriptlang.org/) - To add typing information
* [material-ui](https://material-ui.com/) - Web UI library used
* [RxJs](https://rxjs-dev.firebaseapp.com/) - Library used to manage API calls 

## Feature Requirements
- [x] User can enter a search query into an input field
- [x] User can submit the query. This will call an API that will return an array of books with the corresponding data (Title, Author, Published Date, Picture, etc)
- [x] User can see the list of books appearing on the page

## Bonus Features
- [x] For each item in the list add a link that will send the User to an external site which has more information about the book
- [x] Implement a Responsive Design
- [x] Add loading animations
- [x] Search while the user types with debounce

## TODO
- [ ] Write tests
- [ ] Fix up styling and display more information about the book
- [ ] Deploy
