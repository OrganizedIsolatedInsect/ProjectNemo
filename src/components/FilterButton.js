import React, {useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import styles, {colors} from '../assets/styles';

const FilterButton = props => {
  const filtered = props.filterState;
  const buttonLabel = props.buttonLabel;

  const buttonPressed = () => {
    props.setFilter(!props.filterState);
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={{
          ...styles.buttonAct,
          backgroundColor: filtered
            ? colors.backgroundColoring
            : colors.primary,
        }}
        onPress={buttonPressed}
        android_ripple={{color: styles.AndroidRiplePressable}}>
        <Text
          style={{
            ...styles.buttonActText,
            color: filtered ? colors.primaryText : colors.neutral,
          }}>
          {buttonLabel}
        </Text>
      </Pressable>
    </View>
  );
};

export default FilterButton;
