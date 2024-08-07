// funcion para traer las peliculas

import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";


interface Options {
    page?: number;
    limit?: number;
}


// popular

export const moviesPopularUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<Movie[]> => {
    // si no hicimos lo del patron adaptador aca podemos hacer:
    // axios.get('....')

    try {
        // si no quisiesemos depender de una implementacion de nuestro tipo NowPlayingResponse, etonces:
        // const nowPlaying = await fetcher.get<Record<string,any>>('/now_playing');
        // decimos que es de tipo Record , con llave de tipo string y el valor any.
        const popular = await fetcher.get<MovieDBMoviesResponse>('/popular',{
					params: {
						page: options?.page ?? 1
					}
				});
        //  console.log(nowPlaying)
        return popular.results.map(result => MovieMapper.fromMovieDBResultToEntity(result))
        // como el argumento que result se le pasa a la funcion entonce podemos hacer lo mismo asi:
        // return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity)

        return [];

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - PopularUseCase');
    }

}


