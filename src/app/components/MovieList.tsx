'use client'
interface MovieListProps {
	searchQuery: string;
}

import React, { useEffect, useState } from "react";
import Movie from "./Movie";

interface MovieType {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}


export async function fetchMovies() {
    
}

const MovieList: React.FC<MovieListProps> = ({ searchQuery }) => {
	const [movies, setMovies] = useState<MovieType[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
          setLoading(true);
          try {
            const page = "1";
            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            const res = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&page=${page}`);
            const data = await res.json();
    
            if (data.Response === "False") {
              setError('No se encontraron películas');
              setMovies([]);
            } else {
              setMovies(data.Search || []);
            }
          } catch (error) {
            setError('Error al cargar los datos');
          } finally {
            setLoading(false);
          }
        };
    
        fetchMovies();
      }, [searchQuery]);
    
      if (loading) {
        return <div className="text-xl text-center">Cargando...</div>;
      }
    
      if (movies.length === 0) {
        return <div className="text-xl text-center">No se encontraron películas</div>;
      }

	return (
		<div className="grid grid-cols-2 gap-20 py-20 max-w-7xl m-auto">
			{movies.map((movie) =>
				movie.Poster !== "N/A" ? (
					<Movie
						key={movie.imdbID}
						Title={movie.Title}
						Year={movie.Year}
						imdbID={movie.imdbID}
						Type={movie.Type}
						Poster={movie.Poster}
					/>
				) : (
					<Movie
						key={movie.imdbID}
						Title={movie.Title}
						Year={movie.Year}
						imdbID={movie.imdbID}
						Type={movie.Type}
						Poster={"/notFound.png"}
					/>
				)
			)}
		</div>
	);
};

export default MovieList;
