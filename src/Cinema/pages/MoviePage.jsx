// MoviePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://localhost:7068/api/Movie/GetAllMovies');
      setMovies(response.data);
    } catch (error) {
      toast.error('Error al obtener la lista de películas', error);      
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('https://localhost:7068/api/Genre/GetAllGenre');
      setGenres(response.data);
    } catch (error) {
      console.error('Error al obtener los géneros:', error);
    }
  };

  const handleEditMovie = (id) => {
    setSelectedMovie(movies.find((movie) => movie.id === id));
    setIsUpdating(true);
  };

  const handleUpdateMovie = async () => {
    try {
      await axios.post(`https://localhost:7068/api/Movie/UpdateMovie/${selectedMovie.id}`, {
        Id: selectedMovie.id,
        Titulo: selectedMovie.titulo,
        AñoLanzamiento: selectedMovie.añoLanzamiento,
        GeneroId: selectedMovie.generoId,
        ImagenPortadaBase64: selectedMovie.imagenPortada,
        ImagenPortada: selectedMovie.imagenPortada,
      });
      toast.success('Película actualizada exitosamente');
      setIsUpdating(false);
      fetchMovies(); // Actualiza la lista de películas después de la actualización
    } catch (error) {     
      toast.error('Error al actualizar la película');
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`https://localhost:7068/api/Movie/DeleteMovie/${id}`);
      toast.success('Película eliminada exitosamente');
      fetchMovies(); // Actualiza la lista de películas después de la eliminación
    } catch (error) {     
      toast.error('Error al eliminar la película');
    }
  };

  const filteredMovies = movies.filter((movie) => {
    if (searchQuery.trim() === '') {
      return true;
    }

    const searchValue = searchQuery.toLowerCase();
    const movieTitle = movie.titulo.toLowerCase();
    const movieGenre = genres.find((genre) => genre.id === movie.generoId)?.nombre.toLowerCase();
    const movieYear = movie.añoLanzamiento.toString().toLowerCase();
    const movieId = movie.id.toString().toLowerCase();

    return (
      movieTitle.includes(searchValue) ||
      movieGenre.includes(searchValue) ||
      movieYear.includes(searchValue) ||
      movieId.includes(searchValue)
    );
  });

  return (
    <div className="movie-page-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar películas por título, género, año o id..."
        />
      </div>

      <div className="movie-list">
        <h2>Lista de Películas</h2>
        <ul>
          {filteredMovies.map((movie) => (
            <li key={movie.id}>
              <div className="movie-thumbnail" onClick={() => handleEditMovie(movie.id)}>
                <img src={`data:image/jpeg;base64,${movie.imagenPortada}`} alt={movie.titulo} />
              </div>
              <div className="movie-info">
                <h3>{movie.titulo}</h3>
                <p>Año de Lanzamiento: {movie.añoLanzamiento}</p>
                {genres.length > 0 && (
                  <p>Género: {genres.find((genre) => genre.id === movie.generoId)?.nombre}</p>
                )}              
              </div>
              <div className="movie-actions">
                <button onClick={() => handleEditMovie(movie.id)} className="edit-button">
                  Editar
                </button>
                <button onClick={() => handleDeleteMovie(movie.id)} className="delete-button">
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isUpdating && selectedMovie && (
        <div className="movie-details-overlay">
          <div className="movie-details">
            <span className="close-button" onClick={() => setIsUpdating(false)}>
              &times;
            </span>
            <h2>Editar Película</h2>
            <div className="movie-thumbnail">
              <img src={`data:image/jpeg;base64,${selectedMovie.imagenPortada}`} alt={selectedMovie.titulo} />
            </div>
            <div className="movie-info">
              <h3>Título:</h3>
              <input type="text" value={selectedMovie.titulo} onChange={(e) => setSelectedMovie({ ...selectedMovie, titulo: e.target.value })} />

              <h3>Año de Lanzamiento:</h3>
              <input type="text" value={selectedMovie.añoLanzamiento} onChange={(e) => setSelectedMovie({ ...selectedMovie, añoLanzamiento: e.target.value })} />

              <h3>Género:</h3>
              <select value={selectedMovie.generoId} onChange={(e) => setSelectedMovie({ ...selectedMovie, generoId: parseInt(e.target.value) })}>
                <option value={null}>Selecciona un género...</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.nombre}
                  </option>
                ))}
              </select>      

              <button onClick={handleUpdateMovie}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
