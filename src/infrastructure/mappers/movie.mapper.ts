import { FullMovies, Movie } from "../../core/entities/movie.entity";
import type { MovieDBMovie, Result } from "../interfaces/movie-db.responses";

// se puede hacer con una funcion tambien
export class MovieMapper {

    static fromMovieDBResultToEntity(result: Result): Movie {
        return {
            id: result.id,
            title: result.title,
            description: result.overview,
            releaseDate: new Date(result.release_date),
            rating: result.vote_average,
            // poster: result.poster_path, pero quiero ver la imagen completa:
            poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            bacldrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
        }
    }

    static fromMovieDBToEntity(movie: MovieDBMovie): FullMovies {
        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date(movie.release_date),
            rating: movie.vote_average,
            // poster: result.poster_path, pero quiero ver la imagen completa:
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            bacldrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            genres: movie.genres.map(genre => genre.name),
            duration: movie.runtime,
            budget: movie.budget,
            originalTitle: movie.original_title,
            productionCompanies: movie.production_companies.map(company => company.name),
        }
    }

}


// como es un metodo estatico lo puedo llamar directo
// MovieMapper.fromMovieDBResultToEntity()