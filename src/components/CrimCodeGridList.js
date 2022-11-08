/* Creates the first List of Criminal Code Parts/Sections to choose from
 */
//SYSTEM PACKAGES
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//USER IMPORTS
import styles, {colors} from '../assets/styles';

export const CrimCodePartsList = props => {
  const navAid = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() =>
          navAid.navigate('SectionsCCScreen', {heading1key: props.heading1key})
        }>
        <View>
          <View style={styles.gridListItem}>
            <View style={[styles.gridItemMargin, styles.body]}>
              <Text style={{textAlign: 'left', color: colors.primaryText}}>
                {props.heading1label}
              </Text>
              <Text
                style={[
                  styles.sentenceWrap,
                  {
                    marginLeft: 10,
                    width: '70%',
                    flexDirection: 'row',
                    color: colors.primaryText,
                  },
                ]}>
                {props.heading1titletext}
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

export const CrimCodeSectionList = props => {
  const navAid = useNavigation();
  return (
    <View>
      <Pressable
        onPress={() =>
          navAid.navigate('ContentCCScreen', {heading2key: props.heading2key})
        }>
        <View>
          <View style={styles.gridListItem}>
            <View style={[styles.gridItemMargin, styles.body]}>
              <Text style={{textAlign: 'left', color: colors.primaryText}}>
                {props.firstSectionLabel}
              </Text>
              <Text
                style={[
                  styles.sentenceWrap,
                  {marginLeft: 10, color: colors.primaryText},
                ]}>
                {props.heading2titletext}
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
