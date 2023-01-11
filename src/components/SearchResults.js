import React, {useState, useEffect, Suspense, useCallback} from 'react';
import styles from '../assets/styles';
import {View, Text, FlatList, Pressable, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';
import {db} from './Database';
import {createSubSectionArray} from './CreateSubSectionArray';
import ContentMVA from '../components/ContentMVA';

const SearchResults = ({searchTerm, filterArray}) => {
  //set states for search dbData
  // const [searchResults, setSearchResults] = useState(searchQueryTerm);
  const [crimCodeDbData, setCrimCodeDbData] = useState([]);
  const [mvaDbData, setMvaDbData] = useState([]);
  const [crimCodeSearchCount, setCrimCodeSearchCount] = useState([]);
  const [dbIndex, setDbIndex] = useState([]);
  const [subsectionData, setSubsectionData] = useState([]);
  const [mvaRegulationRenderData, setMvaRegulationRenderData] = useState([]);
  const [mvaRenderData, setMvaRenderData] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const navAid = useNavigation();

  useEffect(() => {
    getDbData(searchTerm);
  }, [searchTerm]);

  console.log('sub1: ', subsectionData);

  const transformData = useCallback(() => {
    //create subsection for crime code renders
    setSubsectionData(createSubSectionArray(crimCodeDbData));
    //filter MVA database data into regulation and non regulation
    setMvaRegulationRenderData(
      mvaDbData.filter(data => data.source === 'Motor Vehicle Act Regulations'),
    );
    setMvaRenderData(
      mvaDbData.filter(data => data.source === 'Motor Vehicle Act'),
    );
  }, [crimCodeDbData, mvaDbData]);

  useEffect(() => {
    transformData();
  }, [transformData]);

  console.log('sub', subsectionData);

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   setIsLoading(false);
  //   // }, 1500);
  //   setIsLoading(false);
  // }, [mvaRegulationRenderData, subsectionData, mvaRenderData]);

  // function to get data from NemoDB
  const getDbData = searchTerm => {
    const sqlSearch = `%${searchTerm}%`;
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
        },
      );
      //SQL query for MVA fine data
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
      //SQL for legislation index
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

  // if (isloading === true) {
  //   return (
  //     <View style={styles.spinnerContainer}>
  //       <ActivityIndicator size={'large'} />
  //     </View>
  //   );
  // }

  const LoadingSearchResults = () => {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  };

  const SearchResultsLoaded = () => {
    return (
      <View>
        <FlatList
          data={dbIndex}
          keyExtractor={data => data.legislationId}
          renderItem={({item}) => {
            if (
              item.legislationType === 'CrimCode' &&
              filterArray.some(
                legislation =>
                  legislation.type === 'Criminal Code' &&
                  legislation.filterState === false,
              )
            ) {
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
                                  heading2Key: item.heading2Key,
                                  searchTerm: searchTerm,
                                  marginalNoteKey: item.marginalNoteKey,
                                });
                              }}>
                              <View style={styles.heading_2}>
                                <CrimCodeRenderHeader
                                  subsectionData={item}
                                  searchTerm={searchTerm}
                                />
                              </View>
                              <View>
                                <CrimCodeRenderBody
                                  subsectionData={item}
                                  dbData={crimCodeDbData}
                                  searchTerm={searchTerm}
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
            if (
              item.legislationType === 'MVA' &&
              filterArray.some(
                legislation =>
                  legislation.type === 'Motor Vehicle Regulations' &&
                  legislation.filterState === false,
              )
            ) {
              return (
                <View>
                  <Text style={styles.heading_2}>{item.legislationTitle}</Text>
                  <FlatList
                    data={mvaRegulationRenderData}
                    keyExtractor={data => data.index}
                    renderItem={({item, index}) => {
                      return (
                        <View key={index} style={styles.searchResultsContainer}>
                          <ContentMVA
                            provisionId={item.provision}
                            searchTerm={searchTerm}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
              );
            }

            if (
              item.legislationType === 'MVA' &&
              filterArray.some(
                legislation =>
                  legislation.type === 'Motor Vehicle Act' &&
                  legislation.filterState === false,
              )
            ) {
              return (
                <View>
                  <Text style={styles.heading_2}>{item.legislationTitle}</Text>
                  <FlatList
                    data={mvaRenderData}
                    keyExtractor={data => data.index}
                    renderItem={({item, index}) => {
                      return (
                        <View key={index} style={styles.searchResultsContainer}>
                          <ContentMVA
                            provisionId={item.provision}
                            searchTerm={searchTerm}
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

  return (
    <Suspense fallback={<ActivityIndicator size={'large'} />}>
      <SearchResultsLoaded />
    </Suspense>
  );
};

export default SearchResults;
