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
        bookmarkArray =>
          bookmarkArray.legislationGroup !== action.payload.legislationGroup &&
          bookmarkArray.lawType !== action.payload.lawType,
      );
    },
  },
});

export const {addBookmark, removeBookmark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
