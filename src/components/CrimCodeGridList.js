/* Creates the first List of Criminal Code Parts/Sections to choose from
 */
//SYSTEM PACKAGES
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//USER IMPORTS
import styles from '../assets/styles';
import {ArrowIcon} from '../assets/icons';

const CrimCodeGridList = props => {
  const navAid = useNavigation();
  const screenName = props.currentScreen;

  return (
    <View>
      <Pressable
        onPress={() => {
          if (screenName === 'PartsCCScreen') {
            navAid.navigate('SectionsCCScreen', {
              passingKey: props.headingkey,
              part: props.headinglabel,
              heading: props.headingtitletext,
            });
          } else {
            navAid.navigate('ContentCCScreen', {
              passingKey: props.headingkey,
              part: props.headinglabel,
              heading: props.headingtitletext,
            });
          }
        }}>
        <View>
          <View style={styles.gridListItem}>
            <View style={[styles.gridItemMargin, styles.body]}>
              <Text style={[styles.headingLabelText]}>
                {props.headinglabel}
              </Text>
              <Text style={styles.headingTitleText}>
                {props.headingtitletext}
              </Text>
            </View>
            <ArrowIcon />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CrimCodeGridList;
