import {createSlice} from '@reduxjs/toolkit';

//redux store for boookmarks

const initialState = {
  bookmarkArray: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarkArray.push(action.payload);
    },
    removeBookmark: (state, action) => {
      //remove Crim Code bookmarks
      if (action.payload.lawType === 'CC') {
        state.bookmarkArray = state.bookmarkArray.filter(item => {
          return item.marginalNoteKey !== action.payload.marginalNoteKey;
        });
      }
      //remove MVA bookmarks
      if (action.payload.lawType === 'MVA') {
        state.bookmarkArray = state.bookmarkArray.filter(item => {
          return item.provisionKey !== action.payload.provisionKey;
        });
      }
    },
  },
});

export const {addBookmark, removeBookmark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
