/* Sections screen - re-usable screen for the Section List for just the Criminal Code Legislation
 */

import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import Reactotron from 'reactotron-react-native';
import {FlashList} from '@shopify/flash-list';

//USER Imports
import styles, {colors} from '../assets/styles';
import {CrimCodeSectionList} from '../components/CrimCodeGridList';
import {db} from '../components/Database';

const SectionsCCScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner

  const [distinctSectionList, setDistinctSectionList] = useState();
  const window = useWindowDimensions();
  const heading1KeyParam = props.route.params.heading1key;

  useEffect(() => {
    getDbData();
  }, []);

  const getDbData = () => {
    db.transaction(tx => {
      tx.executeSql(
        // 'select * from (select * from CrimCode WHERE sectionHeader IS NOT NULL ORDER by section desc, sectionHeader asc) group by section',
        //'select part, section, sectionHeader from (select * from CrimCode WHERE sectionHeader IS NOT NULL ORDER by section desc, sectionHeader asc) group by section',
        'select distinct a.heading1key, a.heading2key, a.heading2titletext, (select b.sectionlabel from CCDataV2 b where b.heading2key=a.heading2key order by sectionkey limit 1) as firstSectionLabel from CCDataV2 a where (heading1key = cast(? as integer)) order by heading2key',
        [heading1KeyParam],
        (_tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setDistinctSectionList(temp);
        },
      );
    });
  };

  const renderList = itemdata => {
    return (
      <CrimCodeSectionList
        heading1key={itemdata.item.heading1key}
        heading2key={itemdata.item.heading2key}
        firstSectionLabel={itemdata.item.firstSectionLabel}
        heading2titletext={itemdata.item.heading2titletext}
      />
    );
  };

  return (
    <View
      style={[styles.background, styles.container, {height: window.height}]}>
      {Reactotron.log('SectionsCC Render')}
      <View>
        <Text
          style={[
            styles.title,
            styles.titleMargin,
            {color: colors.primaryText},
          ]}>
          Criminal Code of Canada
        </Text>
      </View>
      <FlashList
        data={distinctSectionList}
        renderItem={renderList}
        estimatedItemSize={100}
      />
    </View>
  );
};

export default SectionsCCScreen;
