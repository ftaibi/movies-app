import React, {useContext} from 'react';
import {useWindowDimensions} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import {GradientBackground} from '../components/GradientBackground';
import {getColors} from '../../helpers/getColors';
import {GradientContext} from '../../context/GradientContext';
import {useEffect} from 'react';

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const [primary = 'blue', secondary = 'green'] = await getColors(uri);

    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  return !isLoading ? (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 10}}>
          <View style={{height: 440}}>
            <Carousel
              data={nowPlaying!}
              renderItem={({item}) => <MoviePoster movie={item} />}
              sliderWidth={width}
              sliderHeight={420}
              itemHeight={300}
              itemWidth={300}
              windowSize={21}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          <HorizontalSlider title="Popular" movies={popular!} />
          <HorizontalSlider title="Top Rated" movies={topRated!} />
          <HorizontalSlider title="Upcoming" movies={upcoming!} />
        </View>
      </ScrollView>
    </GradientBackground>
  ) : (
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}
      color="red"
      size={100}
    />
  );
};
