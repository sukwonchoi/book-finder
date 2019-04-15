import React, { Component } from "react";
import { Subject, Observable, from, Observer } from "rxjs";
import { takeUntil, debounceTime, map, switchMap, filter, tap } from "rxjs/operators";
import BookDetailsCard from "./components/BookDetailsCard";
import { BookDetails, GetBooksResponse } from "./models/books.model";

import Header from "./components/Header";

import "./App.scss";
import { LinearProgress, Typography } from "@material-ui/core";

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
        filter(searchTerm => searchTerm !== ''),
        takeUntil(this.onDestroy$),
        tap(() => this.setState({loadingState: 'loading'})),
        switchMap(searchTerm => this._getBooks(searchTerm).pipe(map(response => ({ books: response.items }))))
      )
      .subscribe(a => {
        this.setState({
          loadingState: 'success',
          books: a.books || null
        })
      });
  }

  componentWillUnmount() {
    this.onDestroy$.next();
  }

  render() {
    const { books, loadingState } = this.state;
    return (
      <div className="App">
        <Header value={this.state.searchTerm} onChange={this._onSearchInputChange} />
        { loadingState === 'loading' && <LinearProgress style={{ marginTop: 64 }} color="secondary" />}
        <div style={{top: 68, position: 'absolute'}}>
          <div className="contents">
            <div style={{ display: "flex", justifyContent: 'center', maxWidth: 1000, margin: 'auto', flexWrap: "wrap" }}>
              {!!books && books.map(book => (
                <BookDetailsCard key={book.id} bookDetails={book} />
              ))}
            </div>
          </div>

          {
            loadingState === 'initial' && (
              <Typography component="h3" variant="h3">Search for a book title</Typography>
            )
          }
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
