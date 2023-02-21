/*
Arrival can be from either BrowseMVAScreen or BookMarkScreen.  Items passed into ContentMVA to be returned to screen.
*/

import React from 'react';
import ContentMVA from '../components/ContentMVA';

const ContentMVAScreen = props => {
  const provisionKey = props.route.params.provisionKey;

  return <ContentMVA provisionKey={provisionKey} />;
};

export default ContentMVAScreen;
