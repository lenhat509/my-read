import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Route , Link} from 'react-router-dom'
import Book from './Book'
import SearchView from './SearchView'
class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount(){
    BooksAPI.getAll().then(books => {this.setState({books});
  });
  }

  onUpdateShelf = (book, shelf) => {
    book.shelf = shelf;
    let books = [...this.state.books];
    const index = this.state.books.findIndex( ({id}) => id === book.id);
    if (index === -1)
    {
      books.push(book)
    } else {
      books[index] = book;
    }
    this.setState({books});
    BooksAPI.update(book, shelf).then();
  }
  render() {
    return (
      <div>
      <Route exact path ='/' render={() => (
        <div className='list-books'>
          <div className='list-books-title'> 
            <h1>MyReads</h1>
          </div>
          <div className='list-books-content'>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.books
                    .filter(book => book.shelf === 'currentlyReading')
                    .map(book => <Book book={book} key={book.id} onUpdateShelf={this.onUpdateShelf}/>)}
                  </ol>
                </div>      
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books
                    .filter(book => book.shelf === 'wantToRead')
                    .map(book => <Book book={book} key={book.id} onUpdateShelf={this.onUpdateShelf}/>)}
                    </ol>
                </div>      
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books
                    .filter(book => book.shelf === 'read')
                    .map(book => <Book book={book} key={book.id} onUpdateShelf={this.onUpdateShelf}/>)}
                    </ol>
                </div>      
              </div>
          </div>
          <div className='open-search'>
              <Link to='/search' className='open-search-button'></Link>
          </div>
        </div>
      )}/>

      <Route path='/search' render={()=> <SearchView onUpdateShelf={this.onUpdateShelf} booksOnShelves={this.state.books}/>}/>
      </div>
    )
  }
}

export default BooksApp
