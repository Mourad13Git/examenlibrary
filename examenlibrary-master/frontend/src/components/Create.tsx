import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Définition du type Book
interface Book {
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

function createFormField(
  field: FormField,
  values: Book,
  setValues: React.Dispatch<React.SetStateAction<Book>>
) {
  return (
    <div className="form-group" key={field.name}>
      <label htmlFor={field.name}>{field.name}</label>
      <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        className="form-control"
        value={values[field.name]}
        onChange={e => {
          setValues(prev => ({
            ...prev,
            [field.name]: e.target.value,
          }));
        }}
      />
    </div>
  );
}

export function createForm(
  fields: FormField[],
  values: Book,
  setValues: React.Dispatch<React.SetStateAction<Book>>,
  handleSubmit: React.FormEventHandler<HTMLFormElement>
) {
  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => createFormField(field, values, setValues))}
      <button className="btn btn-success">Submit</button>
    </form>
  );
}

function CreateBook() {
  const fields: FormField[] = [
    { name: 'titre', type: 'text', placeholder: 'Titre du livre' },
    { name: 'auteur', type: 'text', placeholder: 'Nom de l’auteur' },
    { name: 'ISBN', type: 'text', placeholder: 'Numéro ISBN' },
  ];

  const navigate = useNavigate();
  const [values, setValues] = useState<Book>({
    titre: '',
    auteur: '',
    ISBN: '',
  });
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!values.titre || !values.auteur || !values.ISBN) {
      setError('Tous les champs sont obligatoires');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/api/books', values);
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
      <h1>Créer un livre</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {createForm(fields, values, setValues, handleSubmit)}
      <Link to="/" className="btn btn-secondary mt-3">Retour</Link>
    </>
  );
}

export default CreateBook;