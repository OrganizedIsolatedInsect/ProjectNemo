//SYSTEM PACKAGES
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//USER IMPORTS
import styles, {colors} from '../assets/styles';

let iconSize = 20;

export const ArrowIcon = () => {
  return (
    <Icon
      style={styles.partsIcon}
      name={'arrow-forward-ios'}
      size={iconSize}
      color={colors.primaryText}
    />
  );
};

export const AccordionUp = () => {
  return <Icon name="keyboard-arrow-up" size={iconSize} />;
};

export const AccordionDown = () => {
  return <Icon name="keyboard-arrow-down" size={iconSize} />;
};
