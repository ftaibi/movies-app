import React from 'react';
import {useWindowDimensions} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  return !isLoading ? (
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
          />
        </View>

        <HorizontalSlider title="Popular" movies={popular!} />
        <HorizontalSlider title="Top Rated" movies={topRated!} />
        <HorizontalSlider title="Upcoming" movies={upcoming!} />
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}
      color="red"
      size={100}
    />
  );
};
