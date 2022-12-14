import {createSlice} from '@reduxjs/toolkit';

//redux store for boookmarks

const initialState = {
  bookmarkArray: [], //genericize variable as it holds items that are not just "sections"
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarkArray.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarkArray = state.bookmarkArray.filter(
        item =>
          !(
            item.passingKey === action.payload.passingKey &&
            item.lawType === action.payload.lawType
          ), //passingkey: for CC it's "marginNoteKey", for MVA it's "provision"
      );
    },
  },
});

export const {addBookmark, removeBookmark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
