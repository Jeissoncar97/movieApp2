'use client'

import React, { useEffect, useState } from "react";
import Movie from "./Movie";

// Tipos para TypeScript
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

    // Estado para almacenar las películas
    const [movies, setMovies] = useState<MovieType[]>([]);

    // Estado para indicar si se está cargando
    const [loading, setLoading] = useState<boolean>(true);

    // Estado para manejar errores de búsqueda
    const [error, setError] = useState<string | null>(null);

    // Estado para manejar la paginación actual
    const [page, setPage] = useState<number>(1);

    // Estado para almacenar el total de resultados de la búsqueda
    const [totalResults, setTotalResults] = useState<number>(0);

    useEffect(() => {
        // Función para obtener películas de la API
        const fetchMovies = async () => {
            setLoading(true); // Indicar que se está cargando
            setError(null); // Limpiar errores previos

            try {
                const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Obtener la API key
                const res = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&page=${page}`); // Hacer la solicitud a la API
                const data = await res.json(); // Convertir la respuesta a JSON

                if (data.Response === "False") {
                    // Si no se encontraron películas, establecer el estado de error y vaciar el arreglo de películas
                    setError('No se encontraron películas');
                    setMovies([]);
                } else {
                    // Si se encontraron películas, actualizar el estado de películas y el total de resultados
                    setMovies(data.Search || []);
                    setTotalResults(parseInt(data.totalResults, 10));
                }
            } catch (error) {
                setError('Error al cargar los datos'); // Manejar errores de solicitud
            } finally {
                setLoading(false); // Finalizar la carga, independientemente del resultado
            }
        };

        fetchMovies(); // Llamar a la función para obtener películas
    }, [searchQuery, page]); // Dependencias: searchQuery y page

    useEffect(() => {
        setPage(1); // Resetear la página a 1 cuando cambia searchQuery
    }, [searchQuery]);

    const totalPages = Math.ceil(totalResults / 10); // Calcular el total de páginas

    // Renderizado condicional basado en el estado de carga y errores
    if (loading) {
        return <div className="text-xl text-center">Cargando...</div>;
    }

    if (error) {
        return <div className="text-xl text-center">{error}</div>;
    }

    // Renderizar películas si no hay errores ni carga activa
    return (
        <div>
            <div className="flex justify-center space-x-4 my-4 items-center">
                {/* Botones de paginación */}
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
            <div className="grid grid-cols-1 gap-10 py-20 max-w-7xl m-auto lg:grid-cols-2">
                {/* Mapeo y renderizado de las películas */}
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
