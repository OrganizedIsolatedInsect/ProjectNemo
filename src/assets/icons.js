import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, {colors} from '../assets/styles';

let ICONSIZE = 20; //general programming practice is that all CONSTANTS should be in uppercase*
let DEVSIZE = 30;
let LARGESIZE = 200;

export const ArrowIcon = () => {
  return (
    <Icon
      style={styles.partsIcon}
      name={'arrow-forward-ios'}
      size={ICONSIZE}
      color={colors.primaryText}
    />
  );
};

export const AccordionUp = () => {
  return (
    <Icon name="keyboard-arrow-up" size={ICONSIZE} color={colors.primaryText} />
  );
};

export const AccordionDown = () => {
  return (
    <Icon
      name="keyboard-arrow-down"
      size={ICONSIZE}
      color={colors.primaryText}
    />
  );
};

export const BookmarkMarked = () => {
  return (
    <Icon name="bookmark" size={ICONSIZE} style={{color: colors.primary}} />
  );
};

export const BookmarkUnmarked = () => {
  return (
    <Icon
      name="bookmark-outline"
      size={ICONSIZE}
      style={{color: colors.primary}}
    />
  );
};

export const DeleteIcon = () => {
  return <Icon name="delete" size={DEVSIZE} />;
};

export const LargeBookmarkIcon = () => {
  return (
    <Icon
      name="collections-bookmark"
      size={LARGESIZE}
      style={{color: colors.primaryText}}
    />
  );
};

// |References:
//* https://en.wikipedia.org/wiki/Naming_convention_(programming)#:~:text=Constants%20should%20be%20written%20in,not%20as%20the%20first%20character.
