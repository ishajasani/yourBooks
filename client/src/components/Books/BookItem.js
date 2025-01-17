import React, { useContext } from "react";
import bookContext from "../context/books/bookContext";

const BookItem = ({ book, updateBook, showAlert }) => {
  const { deleteBook } = useContext(bookContext);

  return (
    <div className="col-md-3">
      <div className="card h-100 shadow-sm border-0 my-3">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title text-primary mb-0 me-3">{book.title}</h5>
            <div className="btn-group">
              <button 
                className="btn btn-link text-danger p-0 me-3"
                onClick={() => {
                  deleteBook(book._id);
                  showAlert("Book deleted successfully", "success");
                }}
                title="Delete book"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
              <button 
                className="btn btn-link text-primary p-0"
                onClick={() => updateBook(book)}
                title="Edit book"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </div>
          
          <p className="card-text text-muted mb-3" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {book.description}
          </p>
          
          <div className="mt-auto">
            <hr className="my-2" />
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                <i className="fa-solid fa-book-open me-1"></i>
                Book ID: {book._id.slice(-4)}
              </small>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => {/* Add view details functionality */}}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;