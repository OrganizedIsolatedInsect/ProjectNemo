//SYSTEM Imports
import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../assets/styles';

export const SearchIconButton = () => {
  const navAid = useNavigation();
  return (
    <Pressable
      onPress={() => navAid.navigate('SearchScreen')}
      style={{paddingRight: 15}}>
      <Icon name={'search'} size={40} style={{color: colors.primaryText}} />
    </Pressable>
  );
};
