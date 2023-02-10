/* Creates the first List of Criminal Code Parts/Sections to choose from.  Generisized to account for which screen component is called from.
 */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import styles from '../assets/styles';
import {ArrowIcon} from '../assets/icons';

const CrimCodeGridList = ({
  heading2Key,
  sectionLabel,
  heading2TitleText,
  heading1Label,
  heading1TitleText,
  heading1Key,
}) => {
  const navAid = useNavigation();
  const screenName = useRoute().name; //gets current screen name of component

  //used for display purposes; initialized dependent upon which screen component was called from.
  let componentLabel; //Part or Section Label
  let componentTitle; //Part or Section Text

  //Determine what text to displace depending on what screen it is currently on
  if (screenName === 'PartsCCScreen') {
    componentLabel = heading1Label;
    componentTitle = heading1TitleText;
  }
  if (screenName === 'SectionsCCScreen') {
    componentLabel = sectionLabel;
    componentTitle = heading2TitleText;
  }

  return (
    <View>
      <Pressable
        onPress={() => {
          if (screenName === 'PartsCCScreen') {
            navAid.navigate('SectionsCCScreen', {
              heading1Key: heading1Key,
              heading1Label: heading1Label,
              heading1TitleText: heading1TitleText,
            });
          }
          if (screenName === 'SectionsCCScreen') {
            navAid.navigate('ContentCCScreen', {
              heading2Key: heading2Key,
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
