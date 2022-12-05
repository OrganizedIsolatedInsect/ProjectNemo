/* Creates the first List of Legislation to choose from
 */
//SYSTEM PACKAGES
import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//USER IMPORTS
import styles, {colors} from '../assets/styles';

const LegislationGridList = props => {
  const navAid = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() =>
          navAid.navigate(props.screenDestination, {paramkey: props})
        }>
        <View style={styles.gridListItem}>
          <Text style={[styles.heading_1, {color: colors.primaryText}]}>
            {props.legislationTitle}
          </Text>
          <Icon
            name={'arrow-forward-ios'}
            size={20}
            style={{color: colors.primaryText}}
          />
        </View>
      </Pressable>
    </View>
  );
};
export default LegislationGridList;
