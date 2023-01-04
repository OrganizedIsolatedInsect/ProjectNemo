import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, {colors} from '../assets/styles';

let iconSize = 20; //general programming practice is that all CONSTANTS should be in uppercase*
let devSize = 30;
let largeSize = 200;

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

export const BookmarkMarked = () => {
  return (
    <Icon name="bookmark" size={iconSize} style={{color: colors.primary}} />
  );
};

export const BookmarkUnmarked = () => {
  return (
    <Icon
      name="bookmark-outline"
      size={iconSize}
      style={{color: colors.primary}}
    />
  );
};

export const DeleteIcon = () => {
  return <Icon name="delete" size={iconSize} style={{color: colors.primary}} />;
};

export const LargeBookmarkIcon = () => {
  return (
    <Icon
      name="collections-bookmark"
      size={largeSize}
      style={{color: colors.primaryText}}
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

// |References:
//* https://en.wikipedia.org/wiki/Naming_convention_(programming)#:~:text=Constants%20should%20be%20written%20in,not%20as%20the%20first%20character.
