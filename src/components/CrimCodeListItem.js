/*  Creates the an item of Criminal Code Parts/Sections to choose from
 */
//SYSTEM PACKAGES
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//USER IMPORTS
import styles from '../assets/styles';

const CrimCodeListItem = props => {
    return(
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.heading_1}>{props.part}</Text>
            <Text style={styles.heading_1}>{props.section}</Text>
            <Text style={styles.heading_1}>{props.sectionHeader}</Text> 

            <Icon name={'arrow-forward'} size={20} />
          </View>
      </View>       

    );


};

export default CrimCodeListItem;

