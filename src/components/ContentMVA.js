import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {db} from '../components/Database';
import HighlightText from '@sanar/react-native-highlight-text';

import styles, {colors} from '../assets/styles';
import Bookmark from './Bookmark';

const ContentMVA = ({provisionId, searchResults}) => {
  const lawType = 'MVA'; // send type to bookmarks
  const [bookmarkArray, setBookmarkArray] = useState([]); //used for just passing 2 fields into the bookmark array
  const [renderDisplayObject, setRenderDisplayObject] = useState([{}]); //used to house data from db, data is rendered in flatlist

  useEffect(() => {
    getDbData(provisionId);
  }, [provisionId]);

  // lookup provisionID on the data table to find the proper row
  // function to get data from NemoDB
  const getDbData = provisionId => {
    db.transaction(tx => {
      tx.executeSql(
        'Select * from MVA where provision = ?',
        [provisionId],
        (_tx, results) => {
          const temp = results.rows.item(0);
          setRenderDisplayObject({
            contravention: temp.contravention,
            fine: temp.fine,
            provision: temp.provision,
            reducedFine: temp.reducedFine,
            source: temp.source,
            sectionText: temp.sectionText,
            sectionSubsection: temp.sectionSubsection,
            sectionParagraph: temp.sectionParagraph,
            sectionSubparagraph: temp.sectionSubparagraph,
          });
          setBookmarkArray({
            provision: temp.provision,
            contravention: temp.contravention,
          });
        },
      );
    });
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.MVAContentHeadingContainer}>
        <View style={styles.MVAContentHeadingContainerLeft}>
          <Text
            style={{
              ...styles.heading_1,
              fontWeight: 'bold',
              color: colors.primaryText,
            }}>
            <HighlightText
              searchWords={[searchResults]}
              textToHighlight={renderDisplayObject.contravention}
              highlightStyle={styles.searchResultsHighlight}
            />
          </Text>
        </View>
        <View style={styles.MVAContentHeadingContainerRight}>
          {/* Bookmark Icon */}
          <Bookmark
            bookmarkDisplayData={bookmarkArray}
            provisionKey={provisionId}
            lawType={lawType}
          />
        </View>
      </View>
      <View style={styles.MVAContentSection}>
        <Text style={{...styles.accent_1, color: colors.primaryText}}>
          {renderDisplayObject.source}, Section {''}
          <HighlightText
            searchWords={[searchResults]}
            textToHighlight={renderDisplayObject.provision}
            highlightStyle={styles.searchResultsHighlight}
          />
        </Text>
        <Text
          style={{...styles.MVAContentSectionText, color: colors.primaryText}}>
          <HighlightText
            searchWords={[searchResults]}
            textToHighlight={renderDisplayObject.sectionText}
            highlightStyle={styles.searchResultsHighlight}
          />
          {'\n'}
        </Text>
        <View style={styles.MVAContentSubsection}>
          <Text
            style={{
              ...styles.MVAContentSectionText,
              color: colors.primaryText,
            }}>
            <HighlightText
              searchWords={[searchResults]}
              textToHighlight={renderDisplayObject.sectionSubsection}
              highlightStyle={styles.searchResultsHighlight}
            />
            <HighlightText
              searchWords={[searchResults]}
              textToHighlight={renderDisplayObject.sectionParagraph}
              highlightStyle={styles.searchResultsHighlight}
            />
            <HighlightText
              searchWords={[searchResults]}
              textToHighlight={renderDisplayObject.sectionSubparagraph}
              highlightStyle={styles.searchResultsHighlight}
            />
            {'\n'}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{...styles.MVAContentTicket, color: colors.primaryText}}>
          Ticketed Amount: {renderDisplayObject.fine} {'\n'}
          Reduced ticket amount ({'<'}30 days):{' '}
          {renderDisplayObject.reducedFine}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContentMVA;
