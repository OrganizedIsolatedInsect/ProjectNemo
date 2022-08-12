/*  Creates the first List of Legislation to choose from
 */
import React from 'react';
import styles from '../assets/styles';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';


const MVAGridList = props => {
  const navAid = useNavigation();

  
console.log(props);

  return (
    <View>
      <Pressable onPress={() => navAid.navigate('Bookmarks')}>
        <Text styles={styles.heading_2}>{props.contravention.fine}</Text>
      </Pressable>
    </View>
  );
};

export default MVAGridList;
