import {createSlice} from '@reduxjs/toolkit';

//redux store for boookmarks

const initialState = {
  sections: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.sections.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.sections = state.sections.filter(
        sections => sections.section !== action.payload.section,
      );
    },
  },
});

export const {addBookmark, removeBookmark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
