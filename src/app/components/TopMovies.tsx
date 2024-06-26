import React, { useEffect, useState } from "react";
import Star from "./Star";
import StarHalf from "./StarHalf";

interface MovieData {
	Title: string;
	Poster: string;
	Year: string;
}

const TopMovies: React.FC = () => {
	const [movies, setMovies] = useState<MovieData[]>([]);
	const movieTitles = [
		"The Lord of the Rings: The Fellowship of the Ring",
		"Inception",
		"Interstellar",
		"The Dark Knight",
		"Avatar",
	];

	useEffect(() => {
		const fetchMoviesData = async () => {
			try {
				const apiKey = process.env.NEXT_PUBLIC_API_KEY;
				const fetchPromises = movieTitles.map(async (title) => {
					const res = await fetch(
						`https://www.omdbapi.com/?t=${encodeURIComponent(
							title
						)}&apikey=${apiKey}`
					);
					const data: MovieData = await res.json();
					return data;
				});
				const moviesData = await Promise.all(fetchPromises);
				setMovies(moviesData); // Actualiza el estado con los datos de las películas
			} catch (error) {
				console.error("Error fetching movies data:", error);
			}
		};

		fetchMoviesData();
	}, []);

	return (
		<div className="">
			<h2 className="text-5xl text-center align-middle my-6 text-custom font-semibold">
				Top películas mas vistas
			</h2>
			{movies.length > 0 ? (
				<div className="grid grid-cols-2 justify-center gap-10 pb-10 md:grid-cols-3 lg:grid-cols-5">
					{movies.map((movie, index) => (
						<div
							key={index}
							className=" shadow-md flex flex-col item-center"
						>
							<div className="flex justify-center">
								<img
									src={movie.Poster}
									alt={movie.Title}
									style={{ width: "200px", height: "300px" }}
								/>
							</div>
							<div className="flex flex-col p-2 item-center justify-center">
								<div className="flex justify-center">
									<Star />
									<Star />
									<Star />
									<Star />
									<StarHalf />
								</div>
								<div className="flex justify-center py-2">
                                    <h2 className="max-w-48 text-xl font-bold">
                                        {movie.Title} - {movie.Year}
                                    </h2>
                                </div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>Cargando...</p>
			)}
		</div>
	);
};

export default TopMovies;
