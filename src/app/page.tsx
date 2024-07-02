'use client'

import React, { useState } from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import MovieIcon from './components/MovieIcon';
import TopMovies from "./components/TopMovies"



// Página principal 
const Home = () => {

  // Estado inicial para tener una lista cuando se abre la página
  const [searchQuery, setSearchQuery] = useState<string>('marvel');

  // Función para manejar el cambio en la búsqueda
  const handleChange = (query: string) => {
    setSearchQuery(query);
  }
  
  return (
    <div className="bg-gray-200">
      {/* Encabezado de la página */}
      <h1 className='text-4xl text-white font-bold text-center py-10 bg-indigo-900 flex justify-center'><MovieIcon />MOVIES<span className='text-2xl font-semibold'>APP</span></h1>

      {/* Componente de las películas más populares */}
      <TopMovies />

      {/* Título y descripción de la página */}
      <h2 className='text-3xl font-semi text-center py-10'>Aquí puedes buscar tus películas y series favoritas</h2>

      {/* Componente de la barra de búsqueda */}
      {/* Se pasa la función handleChange como prop para actualizar searchQuery */}
      <SearchBar onSearchSubmit={handleChange} />

      {/* Componente de la lista de películas */}
      {/* Se pasa el valor actual de searchQuery como prop para realizar la búsqueda */}
      <MovieList searchQuery={searchQuery} />
      
      <TopMovies/>

    </div>
  );
};

export default Home;
