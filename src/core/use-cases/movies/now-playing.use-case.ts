// funcion para traer las peliculas

import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";



export const moviesNowPlayingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
    // si no hicimos lo del patron adaptador aca podemos hacer:
    // axios.get('....')

    try {
        // si no quisiesemos depender de una implementacion de nuestro tipo NowPlayingResponse, etonces:
        // const nowPlaying = await fetcher.get<Record<string,any>>('/now_playing');
        // decimos que es de tipo Record , con llave de tipo string y el valor any.
        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');
        //  console.log(nowPlaying)
        return nowPlaying.results.map(result => MovieMapper.fromMovieDBResultToEntity(result))
        // como el argumento que result se le pasa a la funcion entonce podemos hacer lo mismo asi:
        // return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity)

        return [];

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - NowPlaying');
    }

}


