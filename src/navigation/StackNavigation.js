//PACKAGE Imports
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//USER Imports
import BookmarkScreen from '../screens/BookmarkScreen';
import LandingScreen from '../screens/LandingScreen';
import BrowseMVAScreen from '../screens/BrowseMVAScreen';
import ContentCCScreen from '../screens/ContentCCScreen';
import ContentMVAScreen from '../screens/ContentMVAScreen';
import ExceptionScreen from '../screens/ExceptionScreen';
import PartsCCScreen from '../screens/PartsCCScreen';
import SectionsCCScreen from '../screens/SectionsCCScreen';
import SearchScreen from '../screens/SearchScreen';
import CustomScreenHeader from '../components/CustomScreenHeader';
import LaunchScreen from '../screens/LaunchScreen';
import {SearchIconButton} from '../components/HeaderSearchIconButton';
import AppNavigator from '../navigation/TabNavigation';

const BookMarkNavigator = createStackNavigator();
const ContentNavigator = createStackNavigator();
const LaunchNavigator = createStackNavigator();

const LaunchStack = () => {
  return (
    <LaunchNavigator.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#881E07'},
      }}>
      <LaunchNavigator.Screen name="LaunchScreen" component={LaunchScreen} />
      <LaunchNavigator.Screen name="AppNavigator" component={AppNavigator} />
    </LaunchNavigator.Navigator>
  );
};

const ContentStack = () => {
  return (
    <ContentNavigator.Navigator screenOptions={screenOptionStyle}>
      <ContentNavigator.Screen name="LandingScreen" component={LandingScreen} />
      <ContentNavigator.Screen name="SearchScreen" component={SearchScreen} />
      <ContentNavigator.Screen name="PartsCCScreen" component={PartsCCScreen} />
      <ContentNavigator.Screen
        name="SectionsCCScreen"
        component={SectionsCCScreen}
      />
      <ContentNavigator.Screen
        name="ContentCCScreen"
        component={ContentCCScreen}
      />
      <ContentNavigator.Screen
        name="BrowseMVAScreen"
        component={BrowseMVAScreen}
      />
      <ContentNavigator.Screen
        name="ContentMVAScreen"
        component={ContentMVAScreen}
      />
      <ContentNavigator.Screen
        name="ExceptionScreen"
        component={ExceptionScreen}
      />
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
      <BookMarkNavigator.Screen
        name="MVAContent"
        component={ContentMVAScreen}
      />
      <BookMarkNavigator.Screen
        name="ContentCCScreen"
        component={ContentCCScreen}
      />
    </BookMarkNavigator.Navigator>
  );
};

//STYLING
//shows CustomHeader
//removes back button
const screenOptionStyle = {
  //Navigation Headers turned off as Headers to be created within Screens.
  headerShown: true,
  headerTitleAlign: 'center',
  headerLeft: () => null,
  headerTitle: props => <CustomScreenHeader {...props} />,
  headerRight: props => <SearchIconButton {...props} />,
  // headerSearchBarOptions: {
  //   autoCapitalize: 'none',
  //   obscureBackground: false,
  // },
};

export {ContentStack, BookMarkStack, LaunchStack};

//Remove Header Back Button:   https://infinitbility.com/how-to-remove-back-button-in-react-navigation/
