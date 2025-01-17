import React, { useContext, useEffect, useRef, useState } from "react";
import bookContext from "../context/books/bookContext";
import BookItem from "./BookItem";
import AddBook from "./AddBook";

const Books = ({ showAlert }) => {
  const { books, getBooks } = useContext(bookContext);
  const [book, setBook] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateBook = (currentBook) => {
    ref.current.click();
    setBook({
      id: currentBook._id,
      etitle: currentBook.title,
      edescription: currentBook.description,
      etag: currentBook.tag,
    });
  };

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click();
    showAlert("Book updated successfully", "success");
  };

  return (
    <div className="container-fluid px-4">
      <AddBook 
    //   showAlert={showAlert} 
      />

      {/* Edit Modal Button */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editBookModal"
        ref={ref}
      >
        Launch modal
      </button>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editBookModal"
        tabIndex="-1"
        aria-labelledby="editBookModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-light">
              <h5 className="modal-title" id="editBookModalLabel">
                <i className="fa-solid fa-edit me-2"></i>
                Edit Book
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="mb-4">
                  <label htmlFor="etitle" className="form-label fw-semibold">
                    Title
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa-solid fa-heading"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      placeholder="Enter book title"
                      onChange={onChange}
                      value={book.etitle}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="edescription"
                    className="form-label fw-semibold"
                  >
                    Description
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa-solid fa-align-left"></i>
                    </span>
                    <textarea
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      rows="3"
                      placeholder="Enter book description"
                      onChange={onChange}
                      value={book.edescription}
                    ></textarea>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="etag" className="form-label fw-semibold">
                    Tag
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa-solid fa-tag"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      placeholder="Enter book tag"
                      onChange={onChange}
                      value={book.etag}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top-0">
              <button
                ref={refClose}
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                disabled={
                  book.etitle.length < 1 || book.edescription.length < 2
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                <i className="fa-solid fa-save me-2"></i>
                Update Book
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Books List Section */}
      <div className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary mb-0">
            <i className="fa-solid fa-books me-2"></i>
            Your Books
          </h2>
          <div className="d-flex gap-2 align-items-center">
            <span className="text-muted">Total Books: {books.length}</span>
          </div>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="fa-solid fa-book-open text-muted mb-3"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5 className="text-muted">No books to display</h5>
            <p className="text-muted">
              Add your first book using the form above
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {books.map((book) => (
              <BookItem
                key={book._id}
                updateBook={updateBook}
                book={book}
                showAlert={showAlert}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
