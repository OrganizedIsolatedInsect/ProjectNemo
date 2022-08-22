/*  Creates the first List of Criminal Code Parts/Sections to choose from
 */
//SYSTEM PACKAGES
import React from 'react';
import { View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//USER IMPORTS
import CrimCodeListItem from './CrimCodeListItem';
import styles from '../assets/styles';

const CrimCodeGridList = props => {

  const navAid = useNavigation();


  return (
    <View>
      <Pressable
        onPress={() =>
          navAid.navigate('ContentCCScreen', {paramkey: props})
        }>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.heading_1}>{props.part}</Text>
            <Text style={styles.heading_1}>{props.section}</Text>
            <Text style={styles.heading_1}>{props.sectionHeader}</Text> 

            <Icon name={'arrow-forward'} size={20} />
          </View>
      </View>      
      </Pressable>
    </View>
  );
};

export default CrimCodeGridList;