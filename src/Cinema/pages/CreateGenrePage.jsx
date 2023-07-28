import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateGenrePage = () => {
  const [genreData, setGenreData] = useState({
    Nombre: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7068/api/Genre/AddGenre', genreData);
      toast.success('Género creado con éxito!');
      setGenreData({ Nombre: '' }); // Resetea el formulario después de crear el género
      
    } catch (error) {      
      toast.error('Error al crear el género. Por favor, intenta nuevamente.');
    }
  };

  const handleReset = () => {
    setGenreData({ Nombre: '' });
  };

  return (
    <div className="create-genre-container">
      <div className="create-genre-form">
        <h2>Crear Nuevo Género</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre del Género:</label>
            <input
              type="text"
              id="name"
              name="Nombre" 
              value={genreData.Nombre} 
              onChange={handleChange}
              placeholder="Ingrese el nombre del género"
              required
            />
          </div>
          <button type="submit" className="btn-create">
            Crear Género
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
