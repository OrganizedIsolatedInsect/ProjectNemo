import React, {useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import styles, {colors} from '../assets/styles';

const FilterButton = ({buttonLabel, searchFilters}) => {
  const [filtered, setFiltered] = useState(true);

  // searchFilters.map(item);

  const buttonPressed = () => {
    setFiltered(!filtered);
    console.log(buttonLabel, ':', !filtered);
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={{
          ...styles.buttonAct,
          backgroundColor: filtered
            ? colors.primary
            : colors.backgroundColoring,
        }}
        onPress={buttonPressed}
        android_ripple={{color: styles.AndroidRiplePressable}}>
        <Text
          style={{
            ...styles.buttonActText,
            color: filtered ? colors.neutral : colors.primaryText,
          }}>
          {buttonLabel}
        </Text>
      </Pressable>
    </View>
  );
};

export default FilterButton;
