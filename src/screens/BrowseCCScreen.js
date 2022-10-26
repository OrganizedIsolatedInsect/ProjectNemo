/* BROWSE screen - re-usable screen for browses for just the Criminal Code Legislation
 */

import React, {useState} from 'react';
import {View, Text, SectionList} from 'react-native';
import Reactotron from 'reactotron-react-native';

//USER Imports
import {CCDATAPARTS, CCDATASECTION, CCSampleTest} from '../data/dummy-data'; //for DEVELOPMENT Purposes
import styles, {colors} from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';

const BrowseCCScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner

  const renderList = itemdata => {
    return (
      <CrimCodeGridList
        index={itemdata.item.index}
        part={itemdata.item.part}
        section={itemdata.item.section}
        sectionHeader={itemdata.item.sectionHeader}
      />
    );
  };
  return (
    <View style={[styles.background, styles.container]}>
      {Reactotron.log('BrowseCC Render')}
      <Text
        style={[styles.title, styles.titleMargin, {color: colors.primaryText}]}>
        Criminal Code of Canada
      </Text>
      <SectionList
        sections={CCSampleTest}
        keyExtractor={item => item.index}
        renderItem={renderList}
        renderSectionHeader={({section: {part}}) => (
          <Text style={{color: colors.primary}}></Text>
        )}
        stickySectionHeadersEnabled={'true'}
      />
    </View>
  );
};

export default BrowseCCScreen;
