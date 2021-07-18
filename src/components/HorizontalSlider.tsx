import React from 'react';
import {Movie} from '../interfaces/movieInterface';
import {Text, View, FlatList, ScrollView} from 'react-native';
import {MoviePoster} from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
}
export const HorizontalSlider = ({title, movies}: Props) => {
  return (
    <View
      style={{
        height: title ? 260 : 240,
      }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: '500',
          marginLeft: 10,
        }}>
        {title}
      </Text>
      <FlatList
        data={movies}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
      />
    </View>
  );
};
