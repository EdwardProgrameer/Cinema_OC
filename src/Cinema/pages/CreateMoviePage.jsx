import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateMoviePage = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    year: '',
    genreId: '',
    coverImage: null,
  });

  const [genres, setGenres] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://localhost:7068/api/Genre/GetAllGenre');
        setGenres(response.data);
      } catch (error) {
        toast.error('Error al obtener los géneros. Por favor, intenta nuevamente.');
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (formSubmitted) {
      setMovieData({
        title: '',
        year: '',
        genreId: '',
        coverImage: null,
      });
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result;
      if (base64Data && base64Data.startsWith('data:image')) {
        const imageData = base64Data.replace(/^data:image\/(jpeg|png);base64,/, '');
        setMovieData((prevData) => ({
          ...prevData,
          coverImage: imageData,
        }));
      } else {
        toast.error('Imagen de portada no válida. Asegúrate de seleccionar una imagen.');
      }
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (movieData.coverImage) {
      const movieToSend = {
        Titulo: movieData.title,
        AñoLanzamiento: movieData.year,
        GeneroId: movieData.genreId,
        ImagenPortadaBase64: movieData.coverImage,
      };

      try {
        const response = await axios.post('https://localhost:7068/api/Movie/AddMovie', movieToSend);
        toast.success('Película creada con éxito!');
        setFormSubmitted(true);
      } catch (error) {
        toast.error('Error al crear la película. Por favor, intenta nuevamente.');
      }
    } else {
      toast.error('Imagen de portada no válida. Asegúrate de seleccionar una imagen.');
    }
  };

  const handleReset = () => {
    setMovieData({
      title: '',
      year: '',
      genreId: '',
      coverImage: null,
    });
  };

  return (
    <div className="create-movie-container">
      <div className="create-movie-form">
        <h2>Crear Nueva Película</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={movieData.title}
              onChange={handleChange}
              placeholder="Ingrese el título de la película"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Año de Lanzamiento:</label>
            <input
              type="text"
              id="year"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              placeholder="Ingrese el año de lanzamiento"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genreId">Género:</label>
            <select
              id="genreId"
              name="genreId"
              value={movieData.genreId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un género</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="coverImage">Imagen de Portada:</label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="btn-create">
            Crear Película
          </button>
          <button type="button" className="btn-reset" onClick={handleReset}>
            Resetear Formulario
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
