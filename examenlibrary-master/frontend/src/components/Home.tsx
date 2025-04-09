import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Définition du type Book
interface Book {
  _id: string;
  titre: string;
  auteur: string;
  ISBN: string;
}

// URL de l'API des livres
const BACKEND_URL = 'http://backend:5000/api/books';

const renderTable = (data: Book[]) => {
  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titre</th>
          <th scope="col">Auteur</th>
          <th scope="col">ISBN</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((book, index) => (
          <tr key={book._id}>
            <td>{index + 1}</td>
            <td>{book.titre}</td>
            <td>{book.auteur}</td>
            <td>{book.ISBN}</td>
            <td>
              <Link to={`/read/${book._id}`} className="btn btn-info">Lire</Link>
              <Link to={`/update/${book._id}`} className="btn btn-primary">Modifier</Link>
              <Link to={`/delete/${book._id}`} className="btn btn-danger">Supprimer</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function ListBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(BACKEND_URL);
        setBooks(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    getBooks();
  }, []);

  return (
    <>
      <h1>Liste des Livres</h1>
      <Link to="/create" className="btn btn-success">Créer un Livre +</Link>
      {renderTable(books)}
    </>
  );
}

export default ListBooks;
