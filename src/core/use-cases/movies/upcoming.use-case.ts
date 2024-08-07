// funcion para traer las peliculas

import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";



// upcoming

export const moviesUpcomingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
    // si no hicimos lo del patron adaptador aca podemos hacer:
    // axios.get('....')

    try {
        // si no quisiesemos depender de una implementacion de nuestro tipo NowPlayingResponse, etonces:
        // const nowPlaying = await fetcher.get<Record<string,any>>('/now_playing');
        // decimos que es de tipo Record , con llave de tipo string y el valor any.
        const upcoming = await fetcher.get<MovieDBMoviesResponse>('/upcoming');
        //  console.log(nowPlaying)
        return upcoming.results.map(result => MovieMapper.fromMovieDBResultToEntity(result))
        // como el argumento que result se le pasa a la funcion entonce podemos hacer lo mismo asi:
        // return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity)

        return [];

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - UpcomingUseCase');
    }

}


