import express from "express";
import { body, validationResult } from "express-validator";
import fetchUser from "../middleware/fetchUser.js";
import Book from "../models/Books.js";

const router = express.Router();

// ROUTE 1: Add notes - POST "/api/notes/addnote". Login required
router.post(
    "/addbook",
    fetchUser,
    [
      body("title", "Enter a valid title").isLength({ min: 2 }),
      body("description", "Description must be longer than 10 characters").isLength({ min: 10 }),
    ],
    async (req, res) => {
      try {
        const { title, description, tag } = req.body;
  
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // Create a new note
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

export default router;