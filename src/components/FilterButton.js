import React, {useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import styles, {colors} from '../assets/styles';

const FilterButton = props => {
  const filtered = props.filterState;
  const buttonLabel = props.buttonLabel;
  // searchFilters.map(item);

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
        onPress={buttonPressed}>
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
