/*

*/
import React from 'react';
import ContentMVA from '../components/ContentMVA';

const ContentMVAScreen = ({route}) => {
  const item = route.params.paramkey;
  const query = route.params.query;

  return <ContentMVA item={item} query={query} />;
};

export default ContentMVAScreen;
