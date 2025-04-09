import Book from "../models/Book";
import mongoose from "mongoose";
import { body, validationResult } from 'express-validator';

// Créer un livre
export const createBook = [
  body('titre').notEmpty().withMessage('Le titre est requis'),
  body('auteur').notEmpty().withMessage('L\'auteur est requis'),
  body('ISBN').notEmpty().withMessage('L\'ISBN est requis'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { titre, auteur, ISBN } = req.body;
      const newBook = new Book({ titre, auteur, ISBN });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// Obtenir tous les livres
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un livre par ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Livre non trouvé" });
    res.status(200).json(book);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "ID de livre invalide" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un livre
export const updateBook = async (req, res) => {
  try {
    const { titre, auteur, ISBN } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { titre, auteur, ISBN },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: "Livre non trouvé" });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un livre
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Livre non trouvé" });
    res.status(200).json({ message: "Livre supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware de gestion des erreurs
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
};