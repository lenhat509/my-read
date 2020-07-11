import React, { Component } from 'react';
class Book extends Component {
    render() { 
        const {book, onUpdateShelf} = this.props;
        return ( 
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail:""})`}}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf? book.shelf : 'none'} onChange={(e) => onUpdateShelf(book, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                { (book.authors !== undefined) && book.authors.map(author => <div className="book-authors" key={author}>{author}</div>)}
            </div>
        </li>
        );
    }
}
export default Book;
