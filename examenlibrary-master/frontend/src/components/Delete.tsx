import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// URL du backend
const BACKEND_URL = 'http://localhost:5000/api/books';

function LoadingMessage({ loading }: { loading: boolean }) {
  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <p>Livre supprimé avec succès</p>
      <Link to="/" className="btn btn-success">
        Retour à l'accueil
      </Link>
    </>
  );
}

function DeleteBook() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const { id } = useParams<{ id: string }>();

  const deleteBook = async () => {
    try {
      const res = await axios.delete<{ message: string }>(`${BACKEND_URL}/${id}`);
      console.log(res.data.message);
      setLoading(false);
      navigate('/'); // Rediriger vers l'accueil
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Une erreur est survenue');
      } else {
        setError('Une erreur inattendue est survenue');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (confirmed) {
      deleteBook();
    }
  }, [confirmed, id]);

  if (!confirmed) {
    return (
      <div>
        <p>Êtes-vous sûr de vouloir supprimer ce livre ?</p>
        <button className="btn btn-danger" onClick={() => setConfirmed(true)}>
          Confirmer la suppression
        </button>
        <Link to="/" className="btn btn-secondary ml-2">
          Annuler
        </Link>
      </div>
    );
  }

  return (
    <div>
      {error ? (
        <div>
          <p className="text-danger">{error}</p>
          <Link to="/" className="btn btn-success">
            Retour à l'accueil
          </Link>
        </div>
      ) : (
        <LoadingMessage loading={loading} />
      )}
    </div>
  );
}

export default DeleteBook;