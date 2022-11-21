import React, {useState, useEffect} from 'react';
import {View, useWindowDimensions} from 'react-native';

import styles from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';

import {db} from '../components/Database';

import {FlashList} from '@shopify/flash-list';

const BrowseCCScreen = () => {
  const [distinctSectionList, setDistinctSectionList] = useState();

  const window = useWindowDimensions();

  useEffect(() => {
    getDbData();
  }, []);

  const getDbData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'select part, section, sectionHeader from (select * from CrimCode WHERE sectionHeader IS NOT NULL ORDER by section desc, sectionHeader asc) group by section',
        [],
        (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setDistinctSectionList(temp);
        },
      );
    });
  };

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
    <View
      style={[styles.background, styles.container, {height: window.height}]}>
      <FlashList
        data={distinctSectionList}
        renderItem={renderList}
        estimatedItemSize={100}
      />
    </View>
  );
};

export default BrowseCCScreen;
