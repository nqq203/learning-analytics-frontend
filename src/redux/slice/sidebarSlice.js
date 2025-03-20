import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isCollapsed: false,
    isHiddenSidebar: false,
    isHiddenHeader: false,
    isFetch: false,
  },
  reducers: {
    toggleSidebar: (state, { payload }) => {
      state.isCollapsed = payload;
    },
    hiddenSidebarAndHeader: (state, { payload }) => {
      state.isHiddenHeader = payload;
      state.isHiddenSidebar = payload;
    },
    setFetch: (state, { payload }) => {
      state.isFetch = payload;
    }
  },
})

export const { toggleSidebar, hiddenSidebarAndHeader, setFetch } = sidebarSlice.actions;
export default sidebarSlice.reducer;