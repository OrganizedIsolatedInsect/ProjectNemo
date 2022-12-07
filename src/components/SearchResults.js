import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {
  View,
  Text,
  FlatList,
  VirtualizedList,
  SectionList,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';
import {db} from './Database';
import {createSubSectionArray} from './CreateSubSectionArray';
import ContentMVA from '../components/ContentMVA';

const SearchResults = ({searchQueryTerm}) => {
  const searchTerm = 'vehicle';
  //set states for search dbData
  const [searchResults, setSearchResults] = useState(searchTerm);
  const [crimCodeDbData, setCrimCodeDbData] = useState([]);
  const [mvaDbData, setMvaDbData] = useState([]);
  const [crimCodeSearchCount, setCrimCodeSearchCount] = useState([]);
  const [dbIndex, setDbIndex] = useState([]);

  //remove later
  const [testString, setTestString] = useState('');

  const navAid = useNavigation();

  useEffect(() => {
    setSearchResults(searchTerm);
    getDbData(searchResults);
  }, [searchTerm]);

  //create subsection for crime code renders
  let subsectionData = createSubSectionArray(crimCodeDbData);

  // function to get data from NemoDB
  const getDbData = searchResults => {
    const sqlSearch = `%${searchResults}%`;
    //each ? requires its only index in the array that passes to the executeSql command
    //SQL Query for crim code data
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
          const searchCountTemp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            crimCodeTemp.push(results.rows.item(i));
            searchCountTemp.push(results.rows.item(i).sectionLabel);
          }
          setCrimCodeSearchCount(searchCountTemp);
          setCrimCodeDbData(crimCodeTemp);
          setTestString(crimCodeTemp[0].paragraphText);
        },
      );
    });
    //SQL query for MVA fine data
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * from MVA where contravention like ? or sectionText like ? or sectionSubsection like ? or sectionParagraph like ? or sectionSubparagraph like ? ',
        [sqlSearch, sqlSearch, sqlSearch, sqlSearch, sqlSearch],
        (tx, results) => {
          const mvaTemp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            mvaTemp.push(results.rows.item(i));
          }
          setMvaDbData(mvaTemp);
        },
      );
    });
    //SQL for legislation index
    db.transaction(tx => {
      tx.executeSql('SELECT * from LegislationIndex', [], (tx, results) => {
        const dbIndexTemp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          dbIndexTemp.push(results.rows.item(i));
        }
        setDbIndex(dbIndexTemp);
      });
    });
  };

  const searchCountFilter = crimCodeSearchCount.reduce(function (
    allSectionLabel,
    sectionLabel,
  ) {
    if (sectionLabel in allSectionLabel) {
      allSectionLabel[sectionLabel]++;
    } else {
      allSectionLabel[sectionLabel] = 1;
    }
    return allSectionLabel;
  },
  {});

  //Temp for testing, remove later
  let getIndexArray = testString.split(/[, ,',;,.]+/);
  let indexArray = testString.split(' ');
  let getIndex = getIndexArray.indexOf('vehicle');
  let returnString = indexArray.slice(getIndex - 5, getIndex + 6);
  returnString = returnString.join(' ');

  //add type to dbData
  subsectionData.forEach(function (data) {
    data.type = 'CrimCode';
  });
  mvaDbData.forEach(function (data) {
    data.type = 'MVA';
  });

  const combinedResults = subsectionData.concat(mvaDbData);

  //sort results into pages
  const numResultsReturned = 10;
  let resultsPage = 0;
  let renderArray = [];

  //add page on which result should be in
  for (let i = 0; i < combinedResults.length; i += numResultsReturned) {
    const resultsReturned = combinedResults.slice(i, i + numResultsReturned);
    resultsPage = resultsPage + 1;
    resultsReturned.forEach(function (data) {
      data.resultsPage = resultsPage;
    });
    renderArray.push(resultsReturned);

    //console.log(resultsReturned);
  }

  console.log(renderArray);

  return (
    <View>
      <FlatList
        data={dbIndex}
        keyExtractor={data => data.legislationId}
        renderItem={({item}) => {
          if (item.legislationType === 'CrimCode') {
            return (
              <View>
                <Text style={styles.heading_2}>{item.legislationTitle}</Text>
                <View>
                  <FlatList
                    style={styles.searchResultsContainer}
                    data={subsectionData}
                    keyExtractor={data => data.field1}
                    renderItem={({item, index}) => {
                      return (
                        <View key={index}>
                          <Pressable
                            onPress={() => {
                              navAid.navigate('ContentCCScreen', {
                                passingKey: item.heading2Key,
                                searchResults: searchResults,
                              });
                            }}>
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
                            </View>
                          </Pressable>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            );
          }
          if (item.legislationType === 'MVA') {
            return (
              <View>
                <Text style={styles.heading_2}>{item.legislationTitle}</Text>
                <FlatList
                  data={mvaDbData}
                  keyExtractor={data => data.index}
                  renderItem={({item, index}) => {
                    return (
                      <View key={index} style={styles.searchResultsContainer}>
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
          }
        }}
      />
    </View>
  );
};

export default SearchResults;
