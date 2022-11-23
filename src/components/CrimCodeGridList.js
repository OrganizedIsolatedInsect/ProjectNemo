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

  let componentKey = '';
  let componentLabel = '';
  let componentTitle = '';

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
            });
          } else {
            navAid.navigate('ContentCCScreen', {
              passingKey: componentKey,
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
