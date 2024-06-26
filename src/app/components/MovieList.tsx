'use client'

import React, { useEffect, useState } from "react";
import Movie from "./Movie";

interface MovieType {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

interface MovieListProps {
    searchQuery: string;
}

const MovieList: React.FC<MovieListProps> = ({ searchQuery }) => {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);

            try {
                const apiKey = process.env.NEXT_PUBLIC_API_KEY;
                const res = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&page=${page}`);
                const data = await res.json();

                if (data.Response === "False") {
                    setError('No se encontraron películas');
                    setMovies([]);
                } else {
                    setMovies(data.Search || []);
                    setTotalResults(parseInt(data.totalResults, 10));
                }
            } catch (error) {
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchQuery, page]);
    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    const totalPages = Math.ceil(totalResults / 10);

    if (loading) {
        return <div className="text-xl text-center">Cargando...</div>;
    }

    if (error) {
        return <div className="text-xl text-center">{error}</div>;
    }

    return (
        <div>
            <div className="flex justify-center space-x-4 my-4 items-center">
                <button 
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Anterior
                </button>
                <span>{page} de {totalPages}</span>
                <button 
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Siguiente
                </button>
            </div>
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
            
        </div>
    );
};

export default MovieList;
