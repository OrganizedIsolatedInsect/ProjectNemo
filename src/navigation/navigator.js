import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LegislationScreen from '../screens/LegislationScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import {TabActions} from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Legislation') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <BottomTab.Screen name="Legislation" component={LegislationScreen} />
      <BottomTab.Screen name="Bookmarks" component={BookmarkScreen} />
    </BottomTab.Navigator>
  );
};
