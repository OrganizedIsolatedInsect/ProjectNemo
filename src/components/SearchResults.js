import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {View, Text, FlatList, VirtualizedList, SectionList} from 'react-native';
import Reactotron from 'reactotron-react-native';

import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';
import {db} from './Database';
import {createSubSectionArray} from './CreateSubSectionArray';
import ContentMVA from '../components/ContentMVA';

const SearchResults = ({searchQueryTerm}) => {
  const searchTerm = 'vehicle';
  const [searchResults, setSearchResults] = useState(searchTerm);
  const [crimCodeDbData, setCrimCodeDbData] = useState([]);
  const [mvaDbData, setMvaDbData] = useState([]);

  useEffect(() => {
    setSearchResults(searchTerm);
    getDbData(searchResults);
  }, [searchTerm]);

  let subsectionData = createSubSectionArray(crimCodeDbData);

  const getItem = (data, index) => {
    return data[index];
  };

  const searchResultsIndex = [
    {legislativeTitle: 'Criminal Code', id: 'l1'},
    {legislativeTitle: 'Motor Vehicle Act', id: 'l2'},
  ];

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
        data={searchResultsIndex}
        keyExtractor={data => data.id}
        renderItem={({item}) => {
          if (item.legislativeTitle === 'Criminal Code') {
            return (
              <View>
                <Text style={styles.heading_2}>{item.legislativeTitle}</Text>
                <View>
                  <FlatList
                    style={styles.searchResultsContainer}
                    data={subsectionData}
                    keyExtractor={data => data.field1}
                    renderItem={({item, index}) => {
                      return (
                        <View key={index}>
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
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            );
          }
          if (item.legislativeTitle === 'Motor Vehicle Act') {
            return (
              <View>
                <Text style={styles.heading_2}>{item.legislativeTitle}</Text>
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
