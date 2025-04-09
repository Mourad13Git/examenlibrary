import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Définition du type Book
interface Book {
  _id: string;
  titre: string;
  auteur: string;
  ISBN: string;
}

// URL de l'API des livres
const BACKEND_URL = 'http://localhost:5000/api/books';

function renderBook(book: Book) {
  return (
    <div>
      <h1>{book.titre}</h1>
      <p>{book.auteur}</p>
      <p>{book.ISBN}</p>
    </div>
  );
}

function ReadBook() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book>({
    _id: '',
    titre: '',
    auteur: '',
    ISBN: ''
  });

  useEffect(() => {
    const getBook = async (id: string) => {
      try {
        const res = await axios.get(`${BACKEND_URL}/${id}`);
        const book = res.data.message;
        console.log(book);
        setBook(book);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      getBook(id);
    }
  }, [id]);

  return (
    <>
      {renderBook(book)}
      <h1>Read: {id}</h1>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </>
  );
}

export default ReadBook;
