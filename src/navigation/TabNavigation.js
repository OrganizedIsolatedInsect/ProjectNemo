
//PACKAGE Imports
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

//USER Imports
import LandingScreen from '../screens/LandingScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import { BookMarkStack, ContentStack } from './StackNavigation';


const BottomTab = createBottomTabNavigator();

//NEW BLOCK
export const AppNavigator = () => {
  return (
      <BottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Legislation') {iconName = focused ? 'import-contacts' : 'import-contacts';
            } else if (route.name === 'Bookmarks') {
              iconName = focused ? 'bookmarks' : 'bookmarks';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}>
        <BottomTab.Screen name="Legislation" component={ContentStack} />
        <BottomTab.Screen name="Bookmarks" component={BookMarkStack} />
      </BottomTab.Navigator>
  );
};

//STYLING
const screenOptionStyle = {
  //Navigation Headers turned off as Headers to be created within Screens.
  headerShown: false,
};

export default AppNavigator;
