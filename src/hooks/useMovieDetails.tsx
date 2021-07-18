import {useEffect, useState} from 'react';
import moviesDB from '../api/movieDB';
import {MovieAllDetails} from '../interfaces/movieInterface';
import {Credits} from '../interfaces/creditsInterface';

interface MovieDetails {
  cast: any[];
  isLoading: boolean;
  movieAllDetails?: MovieAllDetails;
}

export type MovieDetailsState = {
  movieDetailPromise: MovieAllDetails;
  castPromise: Credits[];
};

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieAllDetails: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    console.log(movieId);

    const movieDetailPromise = moviesDB.get<MovieAllDetails>(`/${movieId}`);
    const castPromise = moviesDB.get<Credits>(`/${movieId}/credits`);

    try {
      const [movieDetailsResp, castPromiseResp] = await Promise.all([
        movieDetailPromise,
        castPromise,
      ]);

      setState({
        isLoading: false,
        movieAllDetails: movieDetailsResp.data,
        cast: castPromiseResp.data.cast,
      });
    } catch (error) {
      console.log('aaa', error);
    }
  };

  // call the fuction getMovieDetails as soon as this hook is called
  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
