import { Cast } from "../../core/entities/cast.entity";
import { MovieDBCast } from "../interfaces/movie-db.responses";



export class CastMapped {
    static fromMovieDBCastToEntity(actor: MovieDBCast): Cast {
        return {
            id: actor.id,
            name: actor.name,
            character: actor.character ?? 'No character',
            avatar: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        }
    }
}