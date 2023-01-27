import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import styles from '../assets/styles';
import {
  View,
  Text,
  FlatList,
  VirtualizedList,
  SectionList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';
import {db} from './Database';
import {createSubSectionArray} from './CreateSubSectionArray';
import ContentMVA from '../components/ContentMVA';

const SearchResults = ({searchQueryTerm, filterArray}) => {
  const [crimCodeDbData, setCrimCodeDbData] = useState([]);
  const [mvaDbData, setMvaDbData] = useState([]);
  //const [crimCodeSearchCount, setCrimCodeSearchCount] = useState([]);
  const [dbIndex, setDbIndex] = useState([]);
  const [renderObject, setRenderObject] = useState([{}]);
  const [isloading, setIsLoading] = useState(true);
  const renderCount = useRef(0);
  const navAid = useNavigation();

  renderCount.current = renderCount.current + 1;
  //console.log(renderCount.current);

  const searchResults = useMemo(() => {
    //console.log('Search Query');
    return searchQueryTerm;
  }, [searchQueryTerm]);

  // function to get data from NemoDB
  const getDbData = useCallback(
    searchResults => {
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
            //setCrimCodeSearchCount(searchCountTemp);
            //console.log('set crimDb');
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
            //console.log('set mvaDb');
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
    },

    [searchResults],
  );

  const fetchDB = useMemo(() => {
    //console.log('fetch Db');
    return getDbData(searchResults);
  }, [searchResults]);

  const transformData = (crimCodeDbData, mvaDbData) => {
    //console.log('transform data');
    //create subsection for crime code renders
    var subsectionData = createSubSectionArray(crimCodeDbData);

    //filter MVA database data into regulation and non regulation
    var mvaRegulationRenderData = mvaDbData.filter(
      data => data.source === 'Motor Vehicle Act Regulations',
    );
    var mvaRenderData = mvaDbData.filter(
      data => data.source === 'Motor Vehicle Act',
    );

    setRenderObject({
      subsectionData: subsectionData,
      mvaRegulationRenderData: mvaRegulationRenderData,
      mvaRenderData: mvaRenderData,
    });
  };
  //console.log(renderObject);

  const setRenderData = useMemo(() => {
    console.log('render transform');
    return transformData(crimCodeDbData, mvaDbData);
  }, [crimCodeDbData, mvaDbData]);

  if (renderCount.current === 7) {
    setIsLoading(false);
    //console.log(isloading);
  }

  const renderCrimCodeList = ({item, index}) => {
    return (
      <View key={index}>
        <Pressable
          onPress={() => {
            navAid.navigate('ContentCCScreen', {
              heading2Key: item.heading2Key,
              searchResults: searchResults,
              marginalNoteKey: item.marginalNoteKey,
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
  };

  const renderMVAList = ({item, index}) => {
    return (
      <View key={index} style={styles.searchResultsContainer}>
        <ContentMVA
          provisionId={item.provision}
          searchResults={searchResults}
        />
      </View>
    );
  };

  if (isloading === true) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

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
                    data={renderObject.subsectionData}
                    data={renderObject.subsectionData}
                    keyExtractor={data => data.field1}
                    renderItem={renderCrimCodeList}
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
                  data={renderObject.mvaRegulationRenderData}
                  data={renderObject.mvaRegulationRenderData}
                  keyExtractor={data => data.index}
                  renderItem={renderMVAList}
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
                  data={renderObject.mvaRenderData}
                  keyExtractor={data => data.index}
                  renderItem={renderMVAList}
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
