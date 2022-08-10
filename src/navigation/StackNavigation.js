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

  return (
    <ContentNavigator.Navigator screenOptions={screenOptionStyle}>
      <ContentNavigator.Screen name="LandingScreen" component={LandingScreen} options={{ title: 'FINDING NEMO' }} />
      <ContentNavigator.Screen name="MVABrowse" component={MVABrowse} options={{ title: 'FINDING NEMO' }} />
      <ContentNavigator.Screen name="MVAContent" component={MVAContent} options={{ title: 'FINDING NEMO' }} />
      <ContentNavigator.Screen
        name="ExceptionScreen"
        component={ExceptionScreen}
       options={{ title: 'FINDING NEMO' }} />
      <ContentNavigator.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'FINDING NEMO' }} />
    </ContentNavigator.Navigator>
  );
};

const BookMarkStack = () => {

  return (
    <BookMarkNavigator.Navigator screenOptions={screenOptionStyle}>
      <BookMarkNavigator.Screen
        name="BookmarkList"
        component={BookmarkScreen}
        options={{ title: 'FINDING NEMO' }} />
    </BookMarkNavigator.Navigator>
  );
};

//STYLING
const screenOptionStyle = {
  //Navigation Headers turned off as Headers to be created within Screens.
  headerShown: true,


  
};

export {ContentStack, BookMarkStack};
