// backend/routes/bookRoutes.js
import express from 'express';
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} from '../controllers/bookControllers.js'

const router = express.Router();

// Routes CRUD
router.post('/books', createBook); // Créer un livre
router.get('/books',getAllBooks); // Lire tous les livres
router.get('/books/:id', getBookById); // Lire un livre par ID
router.put('/books/:id', updateBook); // Mettre à jour un livre
router.delete('/books/:id', deleteBook); // Supprimer un livre

module.exports = router;