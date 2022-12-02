import React from 'react';
import styles, {colors} from '../assets/styles';
import {Text, View, FlatList} from 'react-native';
import HighlightText from '@sanar/react-native-highlight-text';

/* Component to render Criminal Code Sections
   CrimCodeRender Header shows the section number and name. Takes one variable which is subsectionData, it is the cultivated array of subsections to be rendered
   CrimCodeRender Body shows paragraphs,subparagraphs, subclauses, takes two variables, dbData is the full array from database filtered by sectionKey and subsectionData,
   it is the cultivated array of subsections to be rendered
*/

//function to filter paragraph data into filter array
const createFilter = (data, filter, dbFieldNameKeyString) => {
  for (var i = 0, l = data.length; i < l; i++) {
    if (i === 0) {
      filter.push(data[i]);
    }
    //compares paragraphText to previous index's paragraphText
    if (i > 0) {
      let prevPara = data[i - 1][dbFieldNameKeyString];
      let currentPara = data[i][dbFieldNameKeyString];

      if (currentPara !== prevPara) {
        filter.push(data[i]);
      }
    }
  }
};

// Accordion Header
const CrimCodeRenderHeader = ({
  subsectionData,
  searchResults,
  isActive,
  style,
  props,
}) => {
  return (
    <View>
      <Text style={{color: colors.primaryText, ...style}}>
        {subsectionData.flagShowLabel === false && (
          <Text style={{color: colors.accordionGray}}>
            {subsectionData.sectionLabel}{' '}
          </Text>
        )}
        <Text style={{color: colors.accordionGray}}>
          {subsectionData.subsectionLabel}
        </Text>{' '}
        <HighlightText
          searchWords={[searchResults]}
          textToHighlight={subsectionData.marginalNote}
          highlightStyle={styles.searchResultsHighlight}
        />
      </Text>
    </View>
  );
};

// Accordion Body
const CrimCodeRenderBody = ({subsectionData, dbData, searchResults}) => {
  //filter data that contains paragraphs based on subsectionKey
  let paraData = dbData.filter(
    (paragraph, i) => dbData[i].subsectionKey == subsectionData.subsectionKey,
  );

  //array created to contain paragraphs
  let paraFilter = [];

  createFilter(paraData, paraFilter, 'paragraphKey');

  const renderParagraph = ({item, index}) => {
    let subparaData = dbData.filter(
      (subParagraph, i) => dbData[i].paragraphKey === item.paragraphKey,
    );

    let subparaFilter = [];

    createFilter(subparaData, subparaFilter, 'subparagraphKey');

    return (
      <View style={styles.paragraph}>
        <Text style={{color: colors.primaryText}}>
          {item.paragraphLabel}
          <HighlightText
            searchWords={[searchResults]}
            textToHighlight={item.paragraphText}
            highlightStyle={styles.searchResultsHighlight}
          />
        </Text>
        {subparaFilter.length > 1 ? (
          <FlatList
            data={subparaFilter}
            keyExtractor={item => item.field1}
            listKey={(item3, index) => 'C' + index.toString()}
            renderItem={rendersubParagraph}
          />
        ) : null}
      </View>
    );
  };

  const rendersubParagraph = ({item, index}) => {
    let clauseData = dbData.filter(
      (clause, i) => dbData[i].subparagraphKey === item.subparagraphKey,
    );

    let clauseFilter = [];

    createFilter(clauseData, clauseFilter, 'clauseKey');

    return (
      <View style={styles.subParagraph}>
        <Text style={{color: colors.primaryText}}>
          {item.subparagraphLabel} {item.subparagraphText}
        </Text>
        {clauseFilter.length > 1 ? (
          <FlatList
            data={clauseFilter}
            keyExtractor={item => item.field1}
            listKey={(item3, index) => 'C' + index.toString()}
            renderItem={renderClause}
          />
        ) : null}
      </View>
    );
  };

  const renderClause = ({item, index}) => {
    let subclauseData = dbData.filter(
      (subclause, i) => dbData[i].clauseKey === item.clauseKey,
    );

    let subclauseFilter = [];

    createFilter(subclauseData, subclauseFilter, 'subclauseKey');

    return (
      <View style={styles.subParagraph}>
        <Text style={{color: colors.primaryText}}>
          {item.clauseLabel} {item.clauseText}
        </Text>
        {subclauseFilter.length > 1 ? (
          <FlatList
            data={subclauseFilter}
            keyExtractor={item => item.field1}
            listKey={(item3, index) => 'C' + index.toString()}
            renderItem={rendersubClause}
          />
        ) : null}
      </View>
    );
  };

  const rendersubClause = ({item, index}) => {
    return (
      <View style={styles.subParagraph}>
        <Text style={{color: colors.primaryText}}>
          {item.subclauseLabel} {item.subclauseText}
        </Text>
      </View>
    );
  };

  //check if sectionText needs to be rendered
  if (subsectionData.sectionText != null) {
    return (
      <View>
        <Text style={{color: colors.primaryText}}>
          <HighlightText
            searchWords={[searchResults]}
            textToHighlight={subsectionData.sectionText}
            highlightStyle={styles.searchResultsHighlight}
          />
        </Text>
      </View>
    );
  } //check if paragraphs exists
  else {
    return (
      <View>
        <Text style={{color: colors.primaryText}}>
          <HighlightText
            searchWords={[searchResults]}
            textToHighlight={subsectionData.subsectionText}
            highlightStyle={styles.searchResultsHighlight}
          />
        </Text>
        {paraFilter.length > 1 ? (
          <FlatList
            data={paraFilter}
            keyExtractor={item => item.field1}
            listKey={(item2, index) => 'B' + index.toString()}
            renderItem={renderParagraph}
          />
        ) : null}
      </View>
    );
  }
};

export {CrimCodeRenderHeader, CrimCodeRenderBody};
