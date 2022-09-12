/*
    Header COmponent for every screen which includes 1 consistent title, and 1 Search icon
*/

//SYSTEM Imports
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// import {getDefaultHeaderHeight} from '@react-navigation/elements';

import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

//USER Imports
import styles, {colors} from '../assets/styles';

//Sets up Screen header with title and search button, both which have a navigation component
const CustomScreenHeader = () => {
  // const frame = useSafeAreaFrame();
  // const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  // console.log('Header Height:', headerHeight);
  // console.log('Frame: ', frame);
  // console.log('Insets: ', insets);

  const navAid = useNavigation();
  return (
    <View style={styles.headerViewStyle}>
      <Pressable onPress={() => navAid.navigate('LandingScreen')}>
        <Text style={styles.headerText}>
          <Text style={{color: colors.primaryText}}>
            FINDING <Text style={{color: colors.primary}}>NEMO</Text>
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default CustomScreenHeader;
