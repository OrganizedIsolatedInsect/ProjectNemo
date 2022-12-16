import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {View, Text, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';
import {db} from './Database';
import {createSubSectionArray} from './CreateSubSectionArray';
import ContentMVA from '../components/ContentMVA';

//SearchResults takes two props, the search term to to highlight and the current page it should render

const SearchResults = ({searchTerm, currentPageNum}) => {
  //set states for search dbData
  const [searchResults, setSearchResults] = useState(searchTerm);
  const [crimCodeDbData, setCrimCodeDbData] = useState([]);
  const [mvaDbData, setMvaDbData] = useState([]);

  const [dbIndex, setDbIndex] = useState([]);

  const navAid = useNavigation();

  useEffect(() => {
    setSearchResults(searchTerm);
    getDbData(searchResults);
  }, [searchTerm, currentPageNum]);

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

          setCrimCodeDbData(crimCodeTemp);
          //console.log('searchCountTemp: ', searchCountTemp.length);
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

  //Temp for testing, remove later
  /* let getIndexArray = testString.split(/[, ,',;,.]+/);
  let indexArray = testString.split(' ');
  let getIndex = getIndexArray.indexOf('vehicle');
  let returnString = indexArray.slice(getIndex - 5, getIndex + 6);
  returnString = returnString.join(' '); */

  //add type to dbData in order to choose what to render/filter
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
  let totalSearchArray = [];
  let renderSearchArray = [];
  let renderSearchNavArray = [];

  //add page on which result should be in
  for (let i = 0; i < combinedResults.length; i += numResultsReturned) {
    const resultsReturned = combinedResults.slice(i, i + numResultsReturned);

    //loop though results to see if entry needs header for sorting
    for (const index in resultsReturned) {
      if (index == 0) {
        resultsReturned[index].header = true;
      }
      if (index > 0) {
        const prevType = resultsReturned[index - 1].type;
        if (resultsReturned[index].type != prevType) {
          resultsReturned[index].header = true;
        } else {
          resultsReturned[index].header = false;
        }
      }
    }

    resultsPage = resultsPage + 1;
    const pushedResults = {
      resultsPage: resultsPage,
      resultsReturned: resultsReturned,
    };
    totalSearchArray.push(pushedResults);
    if (resultsPage === currentPageNum) {
      renderSearchArray = resultsReturned;
    }
  }

  //create array for navigation from one results page to another
  for (let i = 1; i <= resultsPage; i++) {
    renderSearchNavArray.push(i);
  }

  return (
    <View style={styles.container}>
      <Text>
        Page {currentPageNum} of {resultsPage}
      </Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {renderSearchNavArray.map((item, index) => {
          {
            //create uniqure variable for rendering of list of result page Numbers
            var key = 'r' + index;
          }
          return (
            <Pressable
              onPress={() => {
                navAid.push('SearchScreen', {
                  currentPageNum: item,
                  searchTerm: searchTerm,
                });
              }}>
              <Text key={key}>[{item}]</Text>
            </Pressable>
          );
        })}
      </View>
      <FlatList
        data={renderSearchArray}
        renderItem={({item, index}) => {
          if (item.type === 'MVA') {
            return (
              <View key={index}>
                <View>
                  {item.header === true ? (
                    <Text style={styles.heading_2}>Motor Vehicle Act</Text>
                  ) : null}
                  <ContentMVA
                    provisionId={item.provision}
                    searchResults={searchResults}
                  />
                </View>
              </View>
            );
          }

          if (item.type === 'CrimCode') {
            return (
              <View key={index}>
                {item.header === true ? (
                  <Text style={styles.heading_2}>Criminal Code of Canada</Text>
                ) : null}
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
          }
        }}
      />
    </View>
  );
};

export default SearchResults;
