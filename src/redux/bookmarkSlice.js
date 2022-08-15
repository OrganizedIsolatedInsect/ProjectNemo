import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  sections: [
    {
      index: '0',
      section: '0.6',
      sectionHeader: 'Initial State Data',
    },
  ],
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.sections.push(action.payload);
    },
    removeBookMark: (state, action) => {
      state.sections = state.sections.filter(
        sections => sections.section !== action.payload.section,
      );
    },
  },
});

export const {addBookmark, removeBookMark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
