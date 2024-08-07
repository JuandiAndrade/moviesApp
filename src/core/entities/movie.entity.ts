// Asi va a lucir nuestro objeto de pelicula
//  Reestructuramos la info que nos llega a nuestro porpio modelo

export interface Movie {

    id: number;
    title: string;
    description: string;
    releaseDate: Date;
    rating: number;
    poster: string;
    bacldrop: string;

}


// Cuando pongo extends tengo las properties de movie + las que pongo en fullMovie
export interface FullMovies extends Movie{

    genres: string[];
    duration: number;
    budget: number;
    originalTitle: string;
    productionCompanies: string[];

}