import React from 'react';
import ContentMVA from '../components/ContentMVA';

// TO BE REMOVED

function ContentScreen({route}) {
  const {item} = route.params;

  return <ContentMVA item={item} />;
}

export default ContentScreen;
