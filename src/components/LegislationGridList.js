/*  Creates the first List of Legislation to choose from
 */
//SYSTEM PACKAGES
import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//USER IMPORTS
import styles from '../assets/styles';


const LegislationGridList = props => {
  const navAid = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navAid.navigate(props.destination, {paramkey: props.dataSource})}>
        <Text styles={styles.heading_1}>{props.title}</Text>
      </Pressable>
    </View>
  );
};
export default LegislationGridList;


