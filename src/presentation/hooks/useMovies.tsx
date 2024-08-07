import React, { useEffect, useState } from 'react'
import type { Movie } from '../../core/entities/movie.entity'
import * as UseCases from '../../core/use-cases'
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter'



let popularPageNumber = 1

export const useMovies = () => {

    const [isLoading, setisLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);


    useEffect(() => {

        initialLoad();

    }, [])


    const initialLoad = async () => {
        // const nowPlayingPromise = await UseCases.moviesNowPlayingUseCase(movieDBFetcher)
        // const popularPromise = await UseCases.moviesPopularUseCase(movieDBFetcher)
        // const topRatedPromise = await UseCases.moviesTopRatedUseCase(movieDBFetcher)
        // const upComingPromise = await UseCases.moviesUpcomingUseCase(movieDBFetcher)
        //  le saco el await para que me haga las peticiones simultaneamente
        const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher)
        // console.log(nowPlayingMovies[0]); 
        const popularPromise = UseCases.moviesPopularUseCase(movieDBFetcher)
        const topRatedPromise = UseCases.moviesTopRatedUseCase(movieDBFetcher)
        const upcomingPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher)

        // estoy desetructurando para que me venga el resultado asi destructurado
        const [nowPlayingMovis, popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise])

        setNowPlaying(nowPlayingMovis)
        setPopular(popularMovies)
        setTopRated(topRatedMovies)
        setUpcoming(upcomingMovies)

        setisLoading(false)

        // console.log({
        //     nowPlayingMovis,
        //     popularMovies,
        //     topRatedMovies,
        //     upcomingMovies,
        // })
    }



    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,


        // Methods
        popularNextPage: async() => {
            popularPageNumber++;
            const popularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher, {
                page: popularPageNumber,
            });
            setPopular( prev=> [...prev, ...popularMovies])
        }
    }
}
