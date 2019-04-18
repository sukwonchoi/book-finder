import React, { Component } from "react";
import { Subject, Observable, Observer } from "rxjs";
import { takeUntil, debounceTime, map, switchMap, filter, tap } from "rxjs/operators";
import BookDetailsCard from "./components/BookDetailsCard";
import { BookDetails, GetBooksResponse } from "./models/books.model";
import { LinearProgress, Typography } from "@material-ui/core";

import Header from "./components/Header";

import "./App.scss";
type LoadingState = "initial" | "loading" | "success" | "failure";

type State = typeof initialState;
const initialState = {
  books: null as null | ReadonlyArray<BookDetails>,
  loadingState: "initial" as LoadingState,
  searchTerm: ""
};

class App extends Component<{}, State> {
  state = initialState;

  onSearchInputChange$ = new Subject<string>();
  onDestroy$ = new Subject();

  componentWillMount() {
    this.onSearchInputChange$
      .pipe(
        debounceTime(250),
        filter(searchTerm => searchTerm !== ""),
        takeUntil(this.onDestroy$),
        tap(() => this.setState({ loadingState: "loading" })),
        switchMap(searchTerm => this._getBooks(searchTerm)
          .pipe(map(response => response.items))
        )
      )
      .subscribe(books => {
        this.setState({
          loadingState: "success",
          books: books || null
        });
      });
  }

  componentWillUnmount() {
    this.onDestroy$.next();
  }

  render() {
    const { books, loadingState } = this.state;
    return (
      <div className="app">
        <div className="app-headerContainer">
          <Header value={this.state.searchTerm} onChange={this._onSearchInputChange} />
          {loadingState === "loading" && <LinearProgress className="app-linearProgress" color="secondary" />}
        </div>
        <div className="app-container">
          <div className="app-bookList">
            {!!books && books.map(book => <BookDetailsCard key={book.id} bookDetails={book} />)}
          </div>
          {loadingState === "initial" && (
            <div className="app-searchLabelContainer">
              <Typography component="h2" variant="display2">
                Search for a book title
              </Typography>
            </div>
          )}
        </div>
      </div>
    );
  }

  _onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.onSearchInputChange$.next(event.target.value);
    this.setState({ searchTerm: event.target.value });
  };

  _getBooks = (searchTerm: string): Observable<GetBooksResponse> => {
    return Observable.create((observer: Observer<GetBooksResponse>) => {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  };
}

export default App;
