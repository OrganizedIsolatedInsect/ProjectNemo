import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {View, Text, FlatList} from 'react-native';

import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';
import {db} from './Database';
import {createSubSectionArray} from './CreateSubSectionArray';
import ContentMVA from '../components/ContentMVA';

const SearchResults = props => {
  const [searchResults, setSearchResults] = useState('licence');
  const [crimCodeDbData, setCrimCodeDbData] = useState([]);
  const [mvaDbData, setMvaDbData] = useState([]);

  useEffect(() => {
    setSearchResults('licence');
    getDbData(searchResults);
  }, []);

  let subsectionData = createSubSectionArray(crimCodeDbData);

  // function to get data from NemoDB
  const getDbData = searchResults => {
    const sqlSearch = `%${searchResults}%`;
    //each ? requires its only index in the array that passes to the executeSql command
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * from CCDataV2 WHERE sectionText like ? or subsectionText like ? or marginalNote like ? or paragraphText like ? or subparagraphText like ? or clauseText like ? or subclauseText like ?',
        [
          sqlSearch,
          sqlSearch,
          sqlSearch,
          sqlSearch,
          sqlSearch,
          sqlSearch,
          sqlSearch,
        ],
        (tx, results) => {
          const crimCodeTemp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            crimCodeTemp.push(results.rows.item(i));
          }
          setCrimCodeDbData(crimCodeTemp);
        },
      );
    });
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * from MVA where sectionText like ? or sectionSubsection like ? or sectionParagraph like ? or sectionSubparagraph like ? ',
        [sqlSearch, sqlSearch, sqlSearch, sqlSearch],
        (tx, results) => {
          const mvaTemp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            mvaTemp.push(results.rows.item(i));
          }

          setMvaDbData(mvaTemp);
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
                <CrimCodeRenderHeader
                  subsectionData={item}
                  searchResults={searchResults}
                />
              </View>
              <View>
                <CrimCodeRenderBody
                  subsectionData={item}
                  dbData={crimCodeDbData}
                  searchResults={searchResults}
                />
                <Text>{'\n'}</Text>
              </View>
            </View>
          );
        }}
      />
      <FlatList
        data={mvaDbData}
        renderItem={({item}) => {
          return (
            <View>
              <ContentMVA
                provisionId={item.provision}
                searchResults={searchResults}
              />
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

;*/
