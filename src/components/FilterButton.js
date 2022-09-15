import React, {useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import styles, {colors} from '../assets/styles';

// Custom FilterButtons which take 'buttonLabel' (name of button) and 'onPress' (what to do) props.
// On press out of the button, it changes the colors of the button to signify pressed or not.

const FilterButton = ({buttonLabel, onPress}) => {
  const [filtered, setFiltered] = useState(true);

  const buttonPressed = () => {
    setFiltered(previousState => !previousState);
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
        onPress={onPress}
        onPressOut={buttonPressed}>
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
