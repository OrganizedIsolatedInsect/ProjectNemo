/*  Creates the first List of Legislation to choose from
 */
import React from 'react';
import styles from '../assets/styles';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LegislationGridList = props => {
  const navAid = useNavigation();

  console.log('GridList ' + props); 
  return (
    <View>
      <Pressable onPress={() => navAid.navigate(props.destination)}>
        <Text styles={styles.heading_1}>{props.id}</Text>
        <Text styles={styles.heading_2}>{props.title}</Text>
        <Text styles={styles.heading_1}>{props.destination}</Text>
      </Pressable>
    </View>
  );
};

export default LegislationGridList;
// <View style={styles.background}>
