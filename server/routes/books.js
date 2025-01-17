import express from "express";
import { body, validationResult } from "express-validator";
import fetchUser from "../middleware/fetchUser.js";
import Book from "../models/Books.js";
import mongoose from "mongoose";

const router = express.Router();

// ROUTE 1: Add books - POST "/api/books/addbook". Login required
router.post(
    "/addbook",
    fetchUser,
    [
      body("title", "Enter a valid title").isLength({ min: 2 }),
      body("description", "Description must be longer than 10 characters").isLength({ min: 2 }),
    ],
    async (req, res) => {
      try {
        const { title, description, tag } = req.body;
  
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // Create a new book
        const book = new Book({
          title,
          description,
          tag,
          user: req.userId,
        });
  
        const savedBook = await book.save();
        res.json(savedBook);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error: Some error occurred" });
      }
    }
  );

  // ROUTE 2: Get all books - GET "/api/books/fetchallbooks". Login required
    router.get("/fetchallbooks", fetchUser, async (req, res) => {
    try {
      const books = await Book.find({ user: req.userId });
      res.json(books);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error: Some error occurred" });
    }
  });

  // ROUTE 3: Update an existing book - PUT "/api/books/updatebook/:id". Login required
  router.put("/updatebook/:id", fetchUser, async (req, res) => {
    try {
      const { title, description, tag } = req.body;
  
      // Validate ID
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid book ID" });
      }
  
      // Create a new book object
      const updatedFields = {};
      if (title) updatedFields.title = title;
      if (description) updatedFields.description = description;
      if (tag) updatedFields.tag = tag;
  
      // Find the book to be updated
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      // Check if user owns the book
      if (book.user.toString() !== req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      // Update the book
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { $set: updatedFields },
        { new: true }
      );
      res.json(updatedBook);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error: Some error occurred" });
    }
  });

  // ROUTE 4: Delete an existing book - DELETE "/api/notes/deletebook/:id". Login required
router.delete("/deletebook/:id", fetchUser, async (req, res) => {
    try {
      // Find the book to be deleted
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Note not found" });
      }
  
      // Check if user owns the book
      if (book.user.toString() !== req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Delete the book
      await Book.findByIdAndDelete(req.params.id);
      res.json({ success: true, msg: "Note has been deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error: Some error occurred" });
    }
  });
  
export default router;