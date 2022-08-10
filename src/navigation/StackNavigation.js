import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BookmarkScreen from '../screens/BookmarkScreen';
import LegislationScreen from '../screens/LegislationScreen';
import LegisSpecialScreen from '../screens/LegisSpecialScreen';
import LegisTOCScreen from '../screens/LegisTOCScreen';
import LegisViewScreen from '../screens/LegisViewScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchNavigator = createStackNavigator();
const LegislationNavigator = createStackNavigator();
const BookMarkNavigator = createStackNavigator();
const BottomTab = createBottomTabNavigator();


  const BottomTabsStack = () => {
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
          headerShown: false,
        })}>
        <BottomTab.Screen name="Legislation" component={LegislationStack} />
        <BottomTab.Screen name="Bookmarks" component={BookMarkStack} />
      </BottomTab.Navigator>
    );
  };

  const SearchStack = () => {
    console.log('SearchStack');
    return (
      <SearchNavigator.Navigator>
        <SearchNavigator.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
        />
      </SearchNavigator.Navigator>
    );
  };

  const LegislationStack = () => {
    console.log('LegislationStack');
    return (
      <LegislationNavigator.Navigator screenOptions={screenOptionStyle}>
        <LegislationNavigator.Screen
          name="LegislationList"
          component={LegislationScreen}
        />
        <LegislationNavigator.Screen
          name="TableOfContents"
          component={LegisTOCScreen}
        />
        <LegislationNavigator.Screen
          name="ViewLegislation"
          component={LegisViewScreen}
        />
        <LegislationNavigator.Screen
          name="SpecialLegislation"
          component={LegisSpecialScreen}
        />
      </LegislationNavigator.Navigator>
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



export {BottomTabsStack, SearchStack, LegislationStack, BookMarkStack } ;
