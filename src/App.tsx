import React, { useState, useEffect } from 'react';
import { Subject, Observable, Observer } from 'rxjs';
import { debounceTime, map, switchMap, filter, tap } from 'rxjs/operators';
import BookDetailsCard from './components/BookDetailsCard';
import { BookDetails, GetBooksResponse } from './models/books.model';
import { LinearProgress, Typography } from '@material-ui/core';

import Header from './components/Header';

import './App.scss';

type LoadingState = 'initial' | 'loading' | 'success' | 'failure';

const App = () => {
  const [books, setBooks] = useState<null | ReadonlyArray<BookDetails>>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [searchTerm, setSearchTerm] = useState('');
  const [onSearchInputChanges$] = useState(new Subject<string>());

  useEffect(() => {
    const subscription = onSearchInputChanges$
      .pipe(
        debounceTime(250),
        filter(searchTerm => searchTerm !== ''),
        tap(() => setLoadingState('loading')),
        switchMap(searchTerm => getBooks(searchTerm).pipe(map(response => response.items)))
      )
      .subscribe(books => {
        setLoadingState('success');
        setBooks(books || null);
      });
    return () => subscription.unsubscribe();
  }, []);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInputChanges$.next(event.target.value);
    setSearchTerm(event.target.value);
  };

  const getBooks = (searchTerm: string): Observable<GetBooksResponse> => {
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

  return (
    <div className="app">
      <div className="app-headerContainer">
        <Header value={searchTerm} onChange={onSearchInputChange} />
        {loadingState === 'loading' && <LinearProgress className="app-linearProgress" color="secondary" />}
      </div>
      <div className="app-container">
        <div className="app-bookList">
          {!!books && books.map(book => <BookDetailsCard key={book.id} bookDetails={book} />)}
        </div>
        {loadingState === 'initial' && (
          <div className="app-searchLabelContainer">
            <Typography component="h2" variant="display2">
              Search for a book title
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
