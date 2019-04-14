import React, { Component } from 'react';
import './App.css';

interface Book {
  id: string;
  volumeInfo: { title: string }
}

type LoadingState = 'initial' | 'loading' | 'success' | 'failure';

type State = typeof initialState;
const initialState = {
  books: [] as ReadonlyArray<Book>,
  loadingState: 'initial' as LoadingState,
  searchTerm: '' as string,
}


class App extends Component<{}, State> {
  state = initialState;
  render() {
    return (
      <div className="App">
        <h1>Book Finder</h1>
        <input value={this.state.searchTerm} onChange={this._onSearchInputChange} type="text"/>
        <button onClick={this._onSearch}>Search</button>
        <ul>
          {this.state.books.map(book => (
            <li key={book.id}>{book.volumeInfo.title}</li>
          ))}
        </ul>
      </div>
    );
  }

  _onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({searchTerm: event.target.value})
  }

  _onSearch = () => {
    const searchTerm = this.state.searchTerm;
    if (searchTerm) {
      this._getBooks(searchTerm);
    }
  }

  _getBooks = async (searchTerm: string) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
    const res = await fetch(url);
    const res_1 = await res.json();
    this.setState({ books: res_1.items });
  }
}

export default App;
