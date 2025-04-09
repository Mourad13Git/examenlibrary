import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    auteur: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true 
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
