import {useEffect} from 'react';
import {useState} from 'react';
import {floor} from 'react-native-reanimated';
import moviesDB from '../api/movieDB';
import {MovieDBMmoviesResponse, Movie} from '../interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}
export const useMovies = () => {
  const [moviesState, setMoviesState] = useState<MoviesState>();

  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    const nowPlayingPromise =
      moviesDB.get<MovieDBMmoviesResponse>('now_playing');
    const popularPromise = moviesDB.get<MovieDBMmoviesResponse>('popular');
    const topRatedPromise = moviesDB.get<MovieDBMmoviesResponse>('top_rated');
    const upcomingPromise = moviesDB.get<MovieDBMmoviesResponse>('upcoming');

    const response = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: response[0].data.results,
      popular: response[1].data.results,
      topRated: response[2].data.results,
      upcoming: response[3].data.results,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
