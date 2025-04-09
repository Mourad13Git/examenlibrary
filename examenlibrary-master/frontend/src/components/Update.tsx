import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createForm } from './Create.tsx';  // Assuming 'createForm' is a reusable form function

// Définition du type Book
interface Book {
  _id: string;
  titre: string;
  auteur: string;
  ISBN: string;
}

// Définition du type FormField
interface FormField {
  name: keyof Book;
  type: string;
  placeholder: string;
}

// URL de l'API des livres
const BACKEND_URL = 'http://localhost:5000/api/books';

function UpdateBook() {
  const fields: FormField[] = [
    { name: "titre", type: "text", placeholder: "Titre significatif" },
    { name: "auteur", type: "text", placeholder: "Nom de l'auteur" },
    { name: "ISBN", type: "text", placeholder: "Numéro ISBN" }
  ];
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book>({
    _id: '',
    titre: '',
    auteur: '',
    ISBN: ''
  });
  const [error, setError] = useState<string | null>(null);

  // Effect hook pour charger les détails du livre à partir de l'ID
  useEffect(() => {
    const getBook = async (id: string) => {
      try {
        const res = await axios.get(`${BACKEND_URL}/${id}`);
        setBook(res.data.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || 'Une erreur est survenue');
        } else {
          setError('Une erreur inattendue est survenue');
        }
      }
    };

    if (id) {
      getBook(id);
    }
  }, [id]);

  const validateForm = () => {
    if (!book.titre || !book.auteur || !book.ISBN) {
      setError('Tous les champs sont obligatoires');
      return false;
    }
    return true;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Arrêter si la validation échoue
    try {
      const res = await axios.put(`${BACKEND_URL}/${id}`, book);
      console.log(res);
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Une erreur est survenue');
      } else {
        setError('Une erreur inattendue est survenue');
      }
    }
  };

  return (
    <>
      <h1>Modifier le livre: {id}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {createForm(fields, book, setBook, handleSubmit)}
      <Link to="/" className="btn btn-secondary mt-3">Retour</Link>
    </>
  );
}

export default UpdateBook;