import {configureStore} from '@reduxjs/toolkit';

import bookmarkReducer from '../redux/bookmarkSlice';

export default configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
  },
});
