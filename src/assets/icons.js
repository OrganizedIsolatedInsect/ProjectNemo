import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

// Criminal Code Content Screen Icons
export const AccordionUp = () => {
  return (
    <Icon name="keyboard-arrow-up" size={iconSize} color={colors.primaryText} />
  );
};

export const AccordionDown = () => {
  return (
    <Icon
      name="keyboard-arrow-down"
      size={iconSize}
      color={colors.primaryText}
    />
  );
};
// Criminal Code Content Screen Icons

// SearchBar Icons
export const MagnifyingGlass = props => {
  return (
    <Icon
      name="search"
      size={iconSize + 10}
      style={{...styles.searchIcon_styling}}
      {...props}
    />
  );
};

export const CloseIcon = props => {
  return (
    <Icon
      name="close"
      size={iconSize + 10}
      style={styles.closeIcon_styling}
      {...props}
    />
  );
};
// SearchBar Icons
