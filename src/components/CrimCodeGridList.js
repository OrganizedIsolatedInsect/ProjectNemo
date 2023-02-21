/* Creates the first List of Criminal Code Parts/Sections to choose from.  Generisized to account for which screen component is called from.
 */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';

import styles from '../assets/styles';
import {ArrowIcon} from '../assets/icons';

const CrimCodeGridList = ({
  heading1Key,
  heading1Label,
  heading1TitleText,
  heading2Key,
  heading2TitleText,
  sectionLabel,
}) => {
  const navAid = useNavigation();
  const screenName = useRoute().name; //gets name of current screen using the useRoute hook source:https://reactnavigation.org/docs/route-prop
  console.log(screenName);

  let passingKey;
  let componentLabel;
  let componentTitle;

  //Determine which screen is calling the component and initialize the appropriate variables to be passed to the destination screen
  if (screenName === 'PartsCCScreen') {
    passingKey = heading1Key;
    componentLabel = heading1Label;
    componentTitle = heading1TitleText;
  }
  if (screenName === 'SectionsCCScreen') {
    //SectionCCScreen.js
    passingKey = heading2Key; //this is coming from sectionCCSCreen heading2Key..
    componentLabel = sectionLabel;
    componentTitle = heading2TitleText;
  }

  return (
    <View>
      <Pressable
        onPress={() => {
          if (screenName === 'PartsCCScreen') {
            navAid.navigate('SectionsCCScreen', {
              passingKey: passingKey,
              heading1Label: heading1Label,
              heading1TitleText: heading1TitleText,
            });
          }
          if (screenName === 'SectionsCCScreen') {
            navAid.navigate('ContentCCScreen', {
              heading2Key: passingKey,
              heading1Label: heading1Label,
              heading1TitleText: heading1TitleText,
              heading2TitleText: heading2TitleText,
            });
          }
        }}
        android_ripple={{color: styles.AndroidRiplePressable}}>
        <View>
          <View style={styles.gridListItem}>
            <View style={[styles.gridItemMargin, styles.body]}>
              <Text style={[styles.componentLabel]}>{componentLabel}</Text>
              <Text style={styles.componentTitle}>{componentTitle}</Text>
            </View>
            <ArrowIcon />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CrimCodeGridList;
