/*  Creates the first List of Criminal Code Parts/Sections to choose from
 */
//SYSTEM PACKAGES
import React from 'react';
import { View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//USER IMPORTS
import CrimCodeListItem from './CrimCodeListItem';

const CrimCodeGridList = props => {

  const navAid = useNavigation();


  return (
    <View>
      <Pressable
        onPress={() =>
          navAid.navigate('ContentCCScreen', {paramkey: props})
        }>
        <CrimCodeListItem  />
      </Pressable>
    </View>
  );
};

export default CrimCodeGridList;