import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
class SearchView extends Component {
    state = { query:'', books:[]}
    handleChange = (e)=> {
        this.setState({query:e.target.value});
        if(e.target.value!=='')
            BooksAPI.search(e.target.value).then( books => { 
                if(!books.error) {
                    const booksOnShelves = this.props.booksOnShelves;
                    const bookOnSearch = books.map(book => {
                        const index = booksOnShelves.findIndex(({id}) => id === book.id);
                        if (index === -1) return book;
                        else return booksOnShelves[index];
                    });
                    this.setState({books: bookOnSearch});
                } else this.setState({books:[]})
            });
        else this.setState({books:[]})
    }
    render() { 
        return ( 
            <div className="search-books">
                <div className="search-books-bar">
                  <Link to='/' className='close-search'></Link>
                  <div className="search-books-input-wrapper">
                    <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                      {this.state.books.map( book => <Book book={book} key={book.id} onUpdateShelf={this.props.onUpdateShelf}/>)}
                  </ol>
                </div>
            </div>
         );
    }
}
export default SearchView;