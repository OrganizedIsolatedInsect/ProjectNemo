/* Creates the first List of Criminal Code Parts/Sections to choose from.  Generisized to account for which screen component is called from.
 */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styles from '../assets/styles';
import {ArrowIcon} from '../assets/icons';

const CrimCodeGridList = props => {
  const navAid = useNavigation();
  const screenName = props.currentScreen;

  //used for display purposes; initialized dependent upon which screen component was called from.
  let componentKey;
  let componentLabel;
  let componentTitle;
  let prevScreen;

  // let heading1Key;
  let heading1Label = props.heading1Label;
  let heading1TitleText = props.heading1TitleText;
  // let heading2Key;
  let heading2TitleText = props.heading2TitleText;
  // let sectionKey;
  // let sectionLabel;
  // let sectionText;
  // let subsectionKey;
  // let subsectionLabel;
  // let subsectionText;
  let marginalNoteKey;
  // let marginalNote;
  // let paragraphKey;
  // let paragraphLabel;
  // let paragraphText;
  // let subparagraphLabel;
  // let subparagraphText;
  // let subparagraphKey;
  // let clauseKey;
  // let clauseLabel;
  // let clauseText;
  // let subclauseKey;
  // let subclauseLabel;
  // let subclauseText;

  //Determine which screen is calling the component and initialize the appropriate variables to be passed to the destination screen
  if (screenName === 'PartsCCScreen') {
    componentKey = props.heading1Key;
    componentLabel = props.heading1Label;
    componentTitle = props.heading1TitleText;
  } else {
    //SectionCCScreen.js
    componentKey = props.heading2Key; //this is coming from sectionCCSCreen heading2Key..
    componentLabel = props.sectionLabel;
    componentTitle = props.heading2TitleText;
    prevScreen = 'SectionCCScreen';
  }


  return (
    <View>
      <Pressable
        onPress={() => {
          if (screenName === 'PartsCCScreen') {
            navAid.navigate('SectionsCCScreen', {
              passingKey: componentKey,
              heading1Label: heading1Label,
              heading1TitleText: heading1TitleText,
            });
          } else {
            navAid.navigate('ContentCCScreen', {
              heading2Key: componentKey,
              prevScreen: prevScreen,
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
