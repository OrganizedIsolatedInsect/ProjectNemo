import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {db} from '../components/Database';
import HighlightText from '@sanar/react-native-highlight-text';

import styles, {colors} from '../assets/styles';
import Bookmark from './Bookmark';

const ContentMVA = ({provisionId, searchResults}) => {
  const provisionID = provisionId;
  const [marked, setMarked] = useState(false); //to change marked status of content
  const [dbData, setDbData] = useState([]); //local data array
  const [loading, setLoading] = useState(false); //for loading cursor purposes

  //state management of object returned from database lookup
  const [provision, setProvision] = useState('');
  const [contravention, setContravention] = useState('');
  const [fine, setFine] = useState('');
  const [reducedFine, setReducedFine] = useState('');
  const [source, setSource] = useState('');
  const [sectionText, setSectionText] = useState('');
  const [sectionSubsection, setSectionSubsection] = useState('');
  const [sectionParagraph, setSectionParagraph] = useState('');
  const [sectionSubparagraph, setSectionSubparagraph] = useState('');
  const [array, setArray] = useState([]); //used for just passing 2 fields into the bookmark array

  const localLawType = 'MVA';
  useEffect(() => {
    setLoading(true);
    getDbData(provisionID);
    setLoading(false);
  }, [marked, loading, provisionID]);

  //lookup provisionID on the data table to find the proper row
  // function to get data from NemoDB
  const getDbData = provID => {
    const temp = [];
    db.transaction(tx => {
      tx.executeSql(
        'Select * from MVA where provision = ?',
        [provID],
        (_tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }

          if (temp.length > 0) {
            setProvision(temp[0].provision);
            setContravention(temp[0].contravention);
            setFine(temp[0].fine);
            setReducedFine(temp[0].reducedFine);
            setSource(temp[0].source);
            setSectionText(temp[0].sectionText);
            setSectionSubsection(temp[0].sectionSubsection);
            setSectionParagraph(temp[0].sectionParagraph);
            setSectionSubparagraph(temp[0].sectionSubparagraph);
            setDbData(temp); //to prepare for page rebuild render to remove hardcoded states
            setArray({
              provision: temp[0].provision,
              contravention: temp[0].contravention,
            });
          }
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
              textToHighlight={contravention}
              highlightStyle={styles.searchResultsHighlight}
            />
          </Text>
        </View>
        <View style={styles.MVAContentHeadingContainerRight}>
          {/* Bookmark Icon */}
          <Bookmark
            data={array}
            marginalNoteKey={provisionID}
            lawType={localLawType}
            setMarked={marked}
          />
        </View>
      </View>
      <View style={styles.MVAContentSection}>
        <Text style={{...styles.accent_1, color: colors.primaryText}}>
          {source}, Section
          <HighlightText
            searchWords={[searchResults]}
            textToHighlight={provision}
            highlightStyle={styles.searchResultsHighlight}
          />
        </Text>
        <Text
          style={{...styles.MVAContentSectionText, color: colors.primaryText}}>
          <HighlightText
            searchWords={[searchResults]}
            textToHighlight={sectionText}
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
              textToHighlight={sectionSubsection}
              highlightStyle={styles.searchResultsHighlight}
            />
            <HighlightText
              searchWords={[searchResults]}
              textToHighlight={sectionParagraph}
              highlightStyle={styles.searchResultsHighlight}
            />
            <HighlightText
              searchWords={[searchResults]}
              textToHighlight={sectionSubparagraph}
              highlightStyle={styles.searchResultsHighlight}
            />
            {'\n'}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{...styles.MVAContentTicket, color: colors.primaryText}}>
          Ticketed Amount: {fine} {'\n'}
          Reduced ticket amount ({'<'}30 days): {reducedFine}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContentMVA;
