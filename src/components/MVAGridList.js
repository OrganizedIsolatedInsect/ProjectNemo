/*  Creates the first List of Legislation to choose from
 */
import React from 'react';
import styles from '../assets/styles';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';


const MVAGridList = props => {
  const navAid = useNavigation();

  
  // TODO navigation is temporoary; needs to change the Browse Screen/component of tools     
  return (
    <View>
      <Pressable onPress={() => navAid.navigate('Bookmarks')}>     
        <Text styles={styles.heading_2}>{props.contravention}</Text>
        <Text styles={styles.heading_2}>{props.provision}</Text>
        <Text styles={styles.heading_2}>{props.fine}</Text>
      </Pressable>
    </View>
  );
};

export default MVAGridList;
