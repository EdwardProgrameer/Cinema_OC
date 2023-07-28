// GenreList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const GenreList = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('https://localhost:7068/api/Genre/GetAllGenre');
      setGenres(response.data);
    } catch (error) {
      toast.error('Error al obtener la lista de géneros', error);
    }
  };

  const handleDeleteGenre = async (id) => {
    try {
      await axios.delete(`https://localhost:7068/api/Genre/DeleteGenero/${id}`);
      toast.success('Género eliminado exitosamente');
      fetchGenres(); // Actualiza la lista de géneros después de la eliminación
    } catch (error) {
      toast.error('Error al eliminar el género');
    }
  };

  return (
    <div className="genre-list-container">
      <h2>Lista de Géneros</h2>
      <ul className="genre-table"> {/* Usamos una clase para aplicar estilos de tabla */}
        {genres.map((genre) => (
          <li key={genre.id} className="genre-row"> {/* Clase para cada fila de género */}
            <span className="genre-name">{genre.nombre}</span> {/* Clase para el nombre del género */}
            <button onClick={() => handleDeleteGenre(genre.id)} className="delete-button">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};
