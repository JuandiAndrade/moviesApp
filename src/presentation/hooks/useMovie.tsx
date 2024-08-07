
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { FullMovies } from '../../core/entities/movie.entity';
import { Cast } from '../../core/entities/cast.entity';


export const useMovie = (movieId: number) => {

	const [isLoading, setisLoading] = useState(true);
	const [movie, setmovie] = useState<FullMovies>();
	const [cast, setCast] = useState<Cast[]>();

	useEffect(() => {

		loadMovie()
	}, [movieId])

	const loadMovie = async () => {
		setisLoading(true);
		// const fullMovie = await UseCases.getMovieByIdUseCase(movieDBFetcher,movieId);
		const fullMoviePromise = UseCases.getMovieByIdUseCase(movieDBFetcher, movieId);
		const castPromise = UseCases.getMovieCastUseCase(movieDBFetcher, movieId);

		const [fullMovie, cast] = await Promise.all([fullMoviePromise, castPromise])

		setmovie(fullMovie);
		setCast(cast)
		setisLoading(false);

		// console.log({ cast })
	}

	return {
		isLoading,
		movie,
		cast,
	}


}
