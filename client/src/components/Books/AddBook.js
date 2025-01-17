import React, { useState, useContext } from "react";
import bookContext from "../context/books/bookContext";

const AddBook = ({ showAlert }) => {
  const { addBook } = useContext(bookContext);
  const [book, setBook] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addBook(book.title, book.description, book.tag);
    setBook({ title: "", description: "", tag: "" });
    showAlert("Book added successfully", "success");
  };

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-primary text-center mb-4">
                <i className="fa-solid fa-book-medical me-2"></i>
                Add New Book
              </h2>
              
              <form>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label fw-semibold">
                    Title
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa-solid fa-heading"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      placeholder="Enter book title"
                      onChange={onChange}
                      value={book.title}
                    />
                  </div>
                  {book.title.length > 0 && book.title.length < 1 && (
                    <small className="text-danger">Title is too short</small>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-semibold">
                    Description
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa-solid fa-align-left"></i>
                    </span>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      placeholder="Enter book description"
                      onChange={onChange}
                      value={book.description}
                    ></textarea>
                  </div>
                  {book.description.length > 0 && book.description.length < 2 && (
                    <small className="text-danger">Description is too short</small>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="tag" className="form-label fw-semibold">
                    Tag
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa-solid fa-tag"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="tag"
                      placeholder="Enter book tag"
                      onChange={onChange}
                      value={book.tag}
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    disabled={book.title.length < 1 || book.description.length < 2}
                    type="submit"
                    className="btn btn-primary py-2"
                    onClick={handleClick}
                  >
                    <i className="fa-solid fa-plus me-2"></i>
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;