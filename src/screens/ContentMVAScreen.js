/*
Arrival can be from either BrowseMVAScreen or BookMarkScreen.  Items passed into ContentMVA to be returned to screen.
*/

import React from 'react';
import ContentMVA from '../components/ContentMVA';

const ContentMVAScreen = props => {
  const provision = props.route.params.provisionId;
  console.log(
    '[ContentMVAScreen] ' + JSON.stringify(props.route.params.provisionId),
  );
  console.log('[ContentMVAScreen] ' + JSON.stringify(provision));

  return <ContentMVA provisionId={provision} />;
};

export default ContentMVAScreen;
