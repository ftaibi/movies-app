import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Cast} from '../interfaces/creditsInterface';
import {MovieAllDetails} from '../interfaces/movieInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import {CastItem} from './CastItem';

interface Props {
  cast: Cast[];
  movieAllDetails: MovieAllDetails;
}
export const MovieDetails = ({cast, movieAllDetails}: Props) => {
  const budget = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(movieAllDetails.budget);
  return (
    <View>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <Icon name="star-outline" size={16} color="#900" />
          <Text>{movieAllDetails.vote_average}</Text>
          <Text>- {movieAllDetails.genres.map(g => g.name).join(', ')}</Text>
        </View>

        {/* Overview */}
        <Text style={{marginTop: 10, fontSize: 23, fontWeight: 'bold'}}>
          Overview
        </Text>
        <Text style={{fontSize: 16}}>{movieAllDetails.overview}</Text>

        {/* Budget */}
        <Text style={{marginTop: 10, fontSize: 23, fontWeight: 'bold'}}>
          Budget
        </Text>
        <Text style={{fontSize: 16}}>{budget}</Text>

        {/* Casting */}
        <View style={{marginTop: 10}}>
          <Text style={{marginTop: 10, fontSize: 23, fontWeight: 'bold'}}>
            Casting
          </Text>
        </View>
      </View>
      <FlatList
        horizontal={true}
        data={cast}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CastItem actor={item} />}
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 10, marginBottom: 50}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
