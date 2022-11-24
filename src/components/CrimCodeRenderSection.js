import React from 'react';
import styles, {colors} from '../assets/styles';
import {Text, View, FlatList} from 'react-native';

/* Component to render Criminal Code Sections
   CrimCodeRender Header shows the section number and name. Takes one variable which is subsectionData, it is the cultivated array of subsections to be rendered
   CrimCodeRender Body shows paragraphs,subparagraphs, subclauses, takes two variables, dbData is the full array from database filtered by sectionKey and subsectionData, it is the cultivated array of subsections to be rendered
   
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

const CrimCodeRenderHeader = ({subsectionData}) => {
  return (
    <View>
      <Text>
        {subsectionData.flagShowLabel === false && (
          <Text style={{fontWeight: 'bold', color: 'blue'}}>
            {subsectionData.sectionLabel}
          </Text>
        )}
        {subsectionData.subsectionLabel} {subsectionData.marginalNote}
      </Text>
    </View>
  );
};

const CrimCodeRenderBody = ({subsectionData, dbData}) => {
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

    if (subparaFilter.length === 1) {
      return (
        <View style={styles.paragraph}>
          <Text>
            {item.paragraphLabel} {item.paragraphText}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.paragraph}>
          <Text>
            {item.paragraphLabel} {item.paragraphText}
          </Text>
          <FlatList
            data={subparaFilter}
            keyExtractor={item => item.field1}
            listKey={(item3, index) => 'C' + index.toString()}
            renderItem={rendersubParagraph}
          />
        </View>
      );
    }
  };

  const rendersubParagraph = ({item, index}) => {
    let clauseData = dbData.filter(
      (clause, i) => dbData[i].subparagraphKey === item.subparagraphKey,
    );

    let clauseFilter = [];

    createFilter(clauseData, clauseFilter, 'clauseKey');

    if (clauseFilter.length === 1) {
      return (
        <View style={styles.subParagraph}>
          <Text>
            {item.subparagraphLabel} {item.subparagraphText}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.subParagraph}>
          <Text>
            {item.subparagraphLabel} {item.subparagraphText}
          </Text>
          <FlatList
            data={clauseFilter}
            keyExtractor={item => item.field1}
            listKey={(item3, index) => 'C' + index.toString()}
            renderItem={renderClause}
          />
        </View>
      );
    }
  };

  const renderClause = ({item, index}) => {
    let subclauseData = dbData.filter(
      (subclause, i) => dbData[i].clauseKey === item.clauseKey,
    );

    let subclauseFilter = [];

    createFilter(subclauseData, subclauseFilter, 'subclauseKey');

    if (subclauseFilter.length === 1) {
      return (
        <View style={styles.subParagraph}>
          <Text>
            {item.clauseLabel} {item.clauseText}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.subParagraph}>
          <Text>
            {item.clauseLabel} {item.clauseText}
          </Text>
          <FlatList
            data={subclauseFilter}
            keyExtractor={item => item.field1}
            listKey={(item3, index) => 'C' + index.toString()}
            renderItem={rendersubClause}
          />
        </View>
      );
    }
  };

  const rendersubClause = ({item, index}) => {
    return (
      <View style={styles.subParagraph}>
        <Text>
          {item.subclauseLabel} {item.subclauseText}
        </Text>
      </View>
    );
  };

  //check if sectionText needs to be rendered
  if (subsectionData.sectionText != null) {
    return (
      <View>
        <Text>{subsectionData.sectionText}</Text>
      </View>
    );
  } //check if paragraphs exists
  else if (paraFilter.length > 1) {
    return (
      <View>
        <Text>
          {subsectionData.subsectionText}
          {'\n'}
        </Text>
        <FlatList
          data={paraFilter}
          keyExtractor={item => item.field1}
          listKey={(item2, index) => 'B' + index.toString()}
          renderItem={renderParagraph}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>{subsectionData.subsectionText}</Text>
      </View>
    );
  }
};

export {CrimCodeRenderHeader, CrimCodeRenderBody};
