import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailScreen} from '../screens/DetailScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {Movie} from '../interfaces/movieInterface';

export type RouteStackParams = {
  HomeScreen: undefined;
  DetailsScreen: Movie;
};

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {},
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
