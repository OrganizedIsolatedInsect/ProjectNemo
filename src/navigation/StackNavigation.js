//PACKAGE Imports
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//USER Imports
import BookmarkScreen from '../screens/BookmarkScreen';
import LandingScreen from '../screens/LandingScreen';
import MVABrowse from '../screens/MVABrowse';
import MVAContent from '../screens/MVAContent';
import ExceptionScreen from '../screens/ExceptionScreen';
import SearchScreen from '../screens/SearchScreen';

const BookMarkNavigator = createStackNavigator();

const ContentNavigator = createStackNavigator();

const ContentStack = () => {
  console.log('ContentStack');
  return (
    <ContentNavigator.Navigator screenOptions={screenOptionStyle}>
      <ContentNavigator.Screen name="LandingScreen" component={LandingScreen} />
      <ContentNavigator.Screen name="MVABrowse" component={MVABrowse} />
      <ContentNavigator.Screen name="MVAContent" component={MVAContent} />
      <ContentNavigator.Screen
        name="ExceptionScreen"
        component={ExceptionScreen}
      />
      <ContentNavigator.Screen name="SearchScreen" component={SearchScreen} />
    </ContentNavigator.Navigator>
  );
};

const BookMarkStack = () => {
  console.log('BookMarkStack');
  return (
    <BookMarkNavigator.Navigator screenOptions={screenOptionStyle}>
      <BookMarkNavigator.Screen
        name="BookmarkList"
        component={BookmarkScreen}
      />
    </BookMarkNavigator.Navigator>
  );
};

//STYLING
const screenOptionStyle = {
  //Navigation Headers turned off as Headers to be created within Screens.
  headerShown: false,
};

export {ContentStack, BookMarkStack};
