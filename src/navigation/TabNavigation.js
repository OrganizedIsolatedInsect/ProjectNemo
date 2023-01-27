//PACKAGE Imports
import React from 'react';
import {Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//USER Imports
import {BookMarkStack, ContentStack} from './StackNavigation';
import styles, {colors} from '../assets/styles';

const BottomTab = createBottomTabNavigator();

export const AppNavigator = () => {
  //Changes style of the Icon to show a line on top
  const CustomTabButton = props => (
    <Pressable
      {...props}
      style={
        props.accessibilityState.selected
          ? [
              props.style,
              {
                borderTopColor: colors.primary,
                borderTopWidth: 2,
              },
            ]
          : props.style
      }
      android_ripple={{color: styles.AndroidRiplePressable}}
    />
  );

  //OUTPUT
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primaryText,
        // tabBarLabelPosition required to keep labels below icons otherwise they may shift to the
        // side after a certain height limitation.
        tabBarLabelPosition: 'below-icon',
        // tabBarHideOnKeyboard is jank af on Android but putting here for discussion.
        // https://github.com/react-navigation/react-navigation/issues/6700#issuecomment-547084964
        tabBarHideOnKeyboard: 'true',
        tabBarLabelStyle: {
          fontFamily: 'NotoSans-Regular',
          fontSize: 12,
          color: colors.primaryText,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Legislation') {
            iconName = focused
              ? 'book-open-page-variant-outline'
              : 'book-open-page-variant-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = focused
              ? 'bookmark-multiple-outline'
              : 'bookmark-multiple-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={50} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {height: 90},
      })}>
      <BottomTab.Screen
        name="Legislation"
        component={ContentStack}
        options={{tabBarButton: CustomTabButton}}
      />
      <BottomTab.Screen
        name="Bookmarks"
        component={BookMarkStack}
        options={{tabBarButton: CustomTabButton}}
      />
    </BottomTab.Navigator>
  );
};

export default AppNavigator;

//Reference Websites
//how to change icon height/width directly: https://github.com/react-navigation/react-navigation/issues/659
//https://stackoverflow.com/questions/60510439/how-to-set-icon-size-in-react-native-navigation-bottom-tab-bar

//Over tab button indicator
//snack: https://snack.expo.dev/6lMAe57lM
//https://stackoverflow.com/questions/64384419/how-to-add-a-line-at-top-of-the-bottom-tab-when-the-current-tab-is-active-in-rea
