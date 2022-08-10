// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// // import {LegislationStack, BookMarkStack} from './StackNavigation';


// const BottomTab = createBottomTabNavigator();

// //NEW BLOCK
// export const AppNavigator = () => {
//   console.log('AppNavigator');
//   return (
//       <BottomTab.Navigator
//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color, size}) => {
//             let iconName;

//             if (route.name === 'Legislation') {iconName = focused ? 'book' : 'book-outline';
//             } else if (route.name === 'Bookmarks') {
//               iconName = focused ? 'bookmark' : 'bookmark-outline';
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           headerShown: false,
//         })}>
//         <BottomTab.Screen name="Legislation" component={LegislationStack} />
//         <BottomTab.Screen name="Bookmarks" component={BookMarkStack} />
//       </BottomTab.Navigator>
//   );
// };

// //STYLING
// const screenOptionStyle = {
//   //Navigation Headers turned off as Headers to be created within Screens.
//   headerShown: false,
// };

// export default AppNavigator;
