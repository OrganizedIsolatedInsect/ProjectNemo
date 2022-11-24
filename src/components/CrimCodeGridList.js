/* Creates the first List of Criminal Code Parts/Sections to choose from
 */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styles from '../assets/styles';
import {ArrowIcon} from '../assets/icons';

const CrimCodeGridList = props => {
  const navAid = useNavigation();
  const screenName = props.currentScreen;

  let componentKey;
  let componentLabel;
  let componentTitle;

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
  // let marginalNoteKey;
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

  if (screenName === 'PartsCCScreen') {
    componentKey = props.heading1Key;
    componentLabel = props.heading1Label;
    componentTitle = props.heading1TitleText;
  } else {
    componentKey = props.headingKey;
    componentLabel = props.sectionLabel;
    componentTitle = props.heading2TitleText;
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
              passingKey: componentKey,
              heading1Label: heading1Label,
              heading1TitleText: heading1TitleText,
              heading2TitleText: heading2TitleText,
            });
          }
        }}>
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
