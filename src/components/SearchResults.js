import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {View, Text, FlatList} from 'react-native';

import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';
import {db} from './Database';
import {createSubSectionArray} from './CreateSubSectionArray';

const SearchResults = props => {
  const [searchResults, setSearchResults] = useState('');
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    setSearchResults('riot');
    getDbData(searchResults);
  }, []);

  let subsectionData = createSubSectionArray(dbData);

  //console.log(subsectionData);

  // function to get data from NemoDB
  const getDbData = searchResults => {
    const sqlSearch = `%${searchResults}%`;

    //each ? requires its only index in the array that passes to the executeSql command
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * from CCDataV2 WHERE heading2TitleText like ? or sectionText like ? or subsectionText like ? or marginalNote like ? or paragraphText like ? or subparagraphText like ? or clauseText like ? or subclauseText like ?',
        [
          sqlSearch,
          sqlSearch,
          sqlSearch,
          sqlSearch,
          sqlSearch,
          sqlSearch,
          sqlSearch,
          sqlSearch,
        ],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setDbData(temp);
        },
      );
    });
  };

  return (
    <View>
      <FlatList
        data={subsectionData}
        keyExtractor={item => item.field1}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <View style={styles.heading_2}>
                <CrimCodeRenderHeader subsectionData={item} />
              </View>
              <View>
                <CrimCodeRenderBody subsectionData={item} dbData={dbData} />
                <Text>{'\n'}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SearchResults;

/* SELECT * from CCDataV2
WHERE heading2TitleText like '%terrorist%'
or sectionText like '%terrorist%'
or subsectionText like '%terrorist%'
or marginalNote like '%terrorist%'
or paragraphText like '%terrorist%'
or subparagraphText like '%terrorist%'
or clauseText like '%terrorist%'
or subclauseText like '%terrorist%' 

return <CrimCodeRenderHeader subsectionData={item} />;*/
