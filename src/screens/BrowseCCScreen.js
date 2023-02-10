import React, {useState, useEffect} from 'react';
import {View, useWindowDimensions, FlatList} from 'react-native';

import styles from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';
import {db} from '../components/Database';

const BrowseCCScreen = () => {
  const [distinctSectionList, setDistinctSectionList] = useState(); // used to house dbData to render
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

  const renderList = ({item}) => {
    return (
      <CrimCodeGridList
        index={item.index}
        part={item.part}
        section={item.section}
        sectionHeader={item.sectionHeader}
      />
    );
  };

  return (
    <View
      style={[styles.background, styles.container, {height: window.height}]}>
      <FlatList
        data={distinctSectionList}
        renderItem={renderList}
        keyExtractor={item => item.index}
      />
    </View>
  );
};

export default BrowseCCScreen;
