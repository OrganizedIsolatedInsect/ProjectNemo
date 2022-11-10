//SYSTEM PACKAGES
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//USER IMPORTS
import styles, {colors} from '../assets/styles';

export const ArrowIcon = () => {
  return (
    <View>
      <Icon
        style={styles.partsIcon}
        name={'arrow-forward-ios'}
        size={20}
        color={colors.primaryText}
      />
    </View>
  );
};
