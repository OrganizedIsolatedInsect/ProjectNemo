/*  Creates the first List of Criminal Code Parts/Sections to choose from
 */
//SYSTEM PACKAGES
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//USER IMPORTS
import CrimCodeListItem from './CrimCodeListItem';
import styles, {colors} from '../assets/styles';

const CrimCodeGridList = props => {
  const navAid = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() =>
          navAid.navigate('ContentCCScreen', {section: props.section})
        }>
        <View>
          <View style={styles.gridListItem}>
            <View style={[styles.gridItemMargin, styles.body]}>
              <Text style={{textAlign: 'left', color: colors.primaryText}}>
                {props.section}
              </Text>
              <Text
                style={[
                  styles.sentenceWrap,
                  {marginLeft: 10, color: colors.primaryText},
                ]}>
                {props.sectionHeader}
              </Text>
            </View>

            <Icon
              name={'arrow-forward-ios'}
              size={20}
              color={colors.primaryText}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CrimCodeGridList;
