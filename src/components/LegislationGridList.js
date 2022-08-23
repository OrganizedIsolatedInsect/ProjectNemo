/*  Creates the first List of Legislation to choose from
 */
//SYSTEM PACKAGES
import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//USER IMPORTS
import styles from '../assets/styles';

const LegislationGridList = props => {
  const navAid = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() => navAid.navigate(props.destination, {paramkey: props})}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.heading_1}>{props.title}</Text>
          <Icon name={'arrow-forward'} size={30} />
        </View>
      </Pressable>
    </View>
  );
};
export default LegislationGridList;
