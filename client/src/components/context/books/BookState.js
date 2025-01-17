import React, { useState } from "react";
import bookContext from "./bookContext";

const BookState = ({ children }) => {
  const host = process.env.React_App_BACKEND_HOST;
  const [books, setBooks] = useState([]);

  // Get all books
  const getBooks = async () => {
    try {
      const response = await fetch(`${host}/api/books/fetchallbooks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4OWRlZGVjNGE1ODcwNjBiMjMwYjY3In0sImlhdCI6MTczNzEwODMwMn0.nTX1E8j3Zgt7rYoNbOWsgTPiD13VtlQwcccl-ZE8eQw",
        },
      });
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Add a book
  const addBook = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/books/addbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4OWRlZGVjNGE1ODcwNjBiMjMwYjY3In0sImlhdCI6MTczNzEwODMwMn0.nTX1E8j3Zgt7rYoNbOWsgTPiD13VtlQwcccl-ZE8eQw",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const book = await response.json();
      setBooks([...books, book]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Update a book
  const editBook = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/books/updatebook/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4OWRlZGVjNGE1ODcwNjBiMjMwYjY3In0sImlhdCI6MTczNzEwODMwMn0.nTX1E8j3Zgt7rYoNbOWsgTPiD13VtlQwcccl-ZE8eQw",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      await response.json();
      setBooks(
        books.map((book) =>
          book._id === id ? { ...book, title, description, tag } : book
        )
      );
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      await fetch(`${host}/api/books/deletebook/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4OWRlZGVjNGE1ODcwNjBiMjMwYjY3In0sImlhdCI6MTczNzEwODMwMn0.nTX1E8j3Zgt7rYoNbOWsgTPiD13VtlQwcccl-ZE8eQw",
        },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <bookContext.Provider
      value={{ books, addBook, editBook, deleteBook, getBooks }}
    >
      {children}
    </bookContext.Provider>
  );
};

export default BookState;
