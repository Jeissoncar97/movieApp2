'use client'

import React, { useState, Suspense } from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import MovieIcon from './components/MovieIcon';
import TopMovies from "./components/TopMovies"

const Home = () => {

  const [searchQuery, setSearchQuery] = useState<string>('marvel')

  const handleChange = (query: string) => {
    setSearchQuery(query)
  }
  

  return (
    <div className="bg-gray-200">
      <h1 className='text-4xl text-white font-bold text-center py-10 bg-indigo-900 flex justify-center'><MovieIcon />MOVIES<span className='text-2xl font-semibold'>APP</span></h1>

      <TopMovies />

      <h2 className='text-3xl font-semi text-center py-10'>Aquí puedes buscar tus películas y series favoritas</h2>
      <SearchBar onSearchSubmit = {handleChange}/>
        <MovieList searchQuery={searchQuery}/>
           
    </div>
  );
};

export default Home;
