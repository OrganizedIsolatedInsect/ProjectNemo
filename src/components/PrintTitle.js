import React from 'react';
import {Text} from 'react-native';

import styles from '../assets/styles';

// Heading component with props pageTitle, pagePartTitle, pagePartLabel and pagePartHeadingTitle.
//  ie. pageTitle = Criminal Code of Canada
//      pagePartTitle = Part IV
//      pagePartLabel = Offences Against the Adminstration of Law and Justice
//      pagePartHeadingTitle = Corruption and Disobedience

export const PrintTitle = props => {
  let pageTitle = props.pageTitle;
  let pagePartTitle = props.pagePartTitle;
  let pagePartLabel = props.pagePartLabel;
  let pagePartHeadingTitle = props.pagePartHeadingTitle;

  return (
    <Text style={styles.printTitleFormatting}>
      <Text style={styles.title}>{pageTitle}
      {pagePartLabel == null ? (<Text>{'\n'}{pagePartTitle}</Text>) : null}
      {pagePartLabel != null ? (<Text>{'\n'}{pagePartTitle} - {pagePartLabel}</Text>) : null}</Text>
      {pagePartHeadingTitle != null ? (<Text style={styles.headingItalics}>{'\n'}{pagePartHeadingTitle}</Text>) : null}
    </Text>
  );
};
