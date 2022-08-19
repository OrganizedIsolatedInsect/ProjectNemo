//PACKAGE Imports
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//USER Imports
import BookmarkScreen from '../screens/BookmarkScreen';
import LandingScreen from '../screens/LandingScreen';
import BrowseScreen from '../screens/BrowseScreen';
import BrowseCCScreen from '../screens/BrowseCCScreen';
import ContentCCScreen from '../screens/ContentCCScreen';
import ExceptionScreen from '../screens/ExceptionScreen';
import SearchScreen from '../screens/SearchScreen';
import CustomScreenHeader from '../components/CustomScreenHeader';

const BookMarkNavigator = createStackNavigator();
const ContentNavigator = createStackNavigator();

const ContentStack = () => {
  return (
    <ContentNavigator.Navigator screenOptions={screenOptionStyle}>
      <ContentNavigator.Screen name="LandingScreen" component={LandingScreen} />
      <ContentNavigator.Screen name="BrowseScreen" component={BrowseScreen} />
      <ContentNavigator.Screen
        name="BrowseCCScreen"
        component={BrowseCCScreen}
      />
      <ContentNavigator.Screen
        name="ContentCCScreen"
        component={ContentCCScreen}
      />
      <ContentNavigator.Screen
        name="ExceptionScreen"
        component={ExceptionScreen}
        options={{headerTitle: props => <CustomScreenHeader {...props} />}}
      />
      <ContentNavigator.Screen name="SearchScreen" component={SearchScreen} />
    </ContentNavigator.Navigator>
  );
};

const BookMarkStack = () => {
  return (
    <BookMarkNavigator.Navigator screenOptions={screenOptionStyle}>
      <BookMarkNavigator.Screen
        name="BookmarkList"
        component={BookmarkScreen}
      />
      <BookMarkNavigator.Screen name="MVAContent" component={ContentCCScreen} />
    </BookMarkNavigator.Navigator>
  );
};

//STYLING
//shows CustomHeader
//removes back button
const screenOptionStyle = {
  //Navigation Headers turned off as Headers to be created within Screens.
  headerShown: true,
  headerTitle: props => <CustomScreenHeader {...props} />,
};

export {ContentStack, BookMarkStack};

//Remove Header Back Button:   https://infinitbility.com/how-to-remove-back-button-in-react-navigation/
