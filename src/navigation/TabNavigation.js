
//PACKAGE Imports
import React from 'react';
import { Pressable } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';


//USER Imports
import { BookMarkStack, ContentStack } from './StackNavigation';
import colors from '../assets/styles';


const BottomTab = createBottomTabNavigator();




//NEW BLOCK
export const AppNavigator = () => {

  const CustomTabButton = (props) => (
    <Pressable
      {...props}
      style={
        props.accessibilityState.selected
          ? [props.style, { borderTopColor: colors.primary, borderTopWidth: 2 }]
          : props.style
      }
    />
  );



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
            return <Icon name={iconName} size={50} color={colors.primary} />;
          },
          // tabBarOptions: {iconStyle: { height: 10000, width: 10000}},   TODO continue with this project
          headerShown: false,
          tabBarStyle: {height: 72},


        })}>
        <BottomTab.Screen name="Legislation" component={ContentStack} options={{tabBarButton: CustomTabButton}} />
        <BottomTab.Screen name="Bookmarks" component={BookMarkStack} options={{tabBarButton: CustomTabButton}} />
      </BottomTab.Navigator>
  );
};

//STYLING
const screenOptionStyle = {
  //Navigation Headers turned off as Headers to be created within Screens.
  headerShown: false,
  tabBarOptions: {iconStyle: { height: 50, width: 50}},
};

export default AppNavigator;


//Reference Websites
//how to change icon height/width directly: https://github.com/react-navigation/react-navigation/issues/659
//https://stackoverflow.com/questions/60510439/how-to-set-icon-size-in-react-native-navigation-bottom-tab-bar