import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BookmarkScreen from '../screens/BookmarkScreen';
import LegislationScreen from '../screens/LegislationScreen';
import LegisTOCScreen from '../screens/LegisTOCScreen';
import LegisViewScreen from '../screens/LegisViewScreen';
import AdvancedSearchScreen from '../screens/AdvancedSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';


//import {TabActions} from '@react-navigation/native';   //UNUSED AT THIS POINT

const BottomTab = createBottomTabNavigator();

const SearchNavigator = createStackNavigator();
const LegislationNavigator = createStackNavigator();

export const SearchStack = () => {
  return (
    <SearchNavigator.Navigator>
      <SearchNavigator.Screen name = "AdvancedSearchScreen" component={AdvancedSearchScreen} />
      <SearchNavigator.Screen name = "SearchResultScreen" component={SearchResultScreen} />      
    </SearchNavigator.Navigator>
  );

};

const LegislationStack = () => {
  return (
    <LegislationNavigator.Navigator  screenOptions={screenOptionStyle}>
      <LegislationNavigator.Screen name = "Legislation" component={LegislationScreen} />
      <LegislationNavigator.Screen name = "TableOfContents" component={LegisTOCScreen} />
      <LegislationNavigator.Screen name = "ViewLegislation" component={LegisViewScreen} />
    </LegislationNavigator.Navigator>

  );

};

//NEW BLOCK
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
      <BottomTab.Screen name="Legislation" component={LegislationStack} />
      <BottomTab.Screen name="Bookmarks" component={BookmarkScreen} />
    </BottomTab.Navigator>
  );
};

//STYLING
const screenOptionStyle = {       //Navigation Headers turned off as Headers to be created within Screens.
   headerShown: false,
};

//ORIGINAL BLOCK
// export const AppNavigator = () => {
//   return (
//     <BottomTab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;

//           if (route.name === 'Legislation') {
//             iconName = focused ? 'book' : 'book-outline';
//           } else if (route.name === 'Bookmarks') {
//             iconName = focused ? 'bookmark' : 'bookmark-outline';
//           }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}>
//       <BottomTab.Screen name="Legislation" component={LegislationScreen} />
//       <BottomTab.Screen name="Bookmarks" component={BookmarkScreen} />
//     </BottomTab.Navigator>
//   );
// };