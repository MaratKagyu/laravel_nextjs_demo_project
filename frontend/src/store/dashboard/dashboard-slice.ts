import { createSlice } from "@reduxjs/toolkit";
import DashboardSliceInterface from "@/type/slice/DashboardSliceInterface";
import {loadAssignedTasks, loadCreatedTasks} from "@/store/dashboard/dashboard-thunks";

const initialDashboardState: DashboardSliceInterface = {
  createdTasks: {
    page: 1,
    canLoadMore: true,
    itemList: null,
    isLoading: false,
  },
  assignedTasks: {
    page: 1,
    canLoadMore: true,
    itemList: null,
    isLoading: false,
  },
  archivedTasks: {
    page: 1,
    canLoadMore: true,
    itemList: null,
    isLoading: false,
  }
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    // setAccessToken: (
    //   state,
    //  { payload }: PayloadAction<{accessToken: string}>
    // ) => {
    //   state.accessToken = payload.accessToken;
    //   StoreAccessToken.save(payload.accessToken)
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCreatedTasks.pending, (state) => {
      state.createdTasks.isLoading = true;
    });
    builder.addCase(loadCreatedTasks.fulfilled, (state, { payload }) => {
      const {
        page,
        canLoadMore,
        itemList,
      } = payload;

      if ((page === 1) || (!state.createdTasks.itemList)) {
        state.createdTasks.itemList = itemList;
      } else {
        state.createdTasks.itemList = [
          ...state.createdTasks.itemList,
          ...itemList
        ];
      }

      state.createdTasks.page = page;
      state.createdTasks.canLoadMore = canLoadMore;
      state.createdTasks.isLoading = false;
    });
    builder.addCase(loadAssignedTasks.pending, (state) => {
      state.assignedTasks.isLoading = true;
    });
    builder.addCase(loadAssignedTasks.fulfilled, (state, { payload }) => {
      const {
        page,
        canLoadMore,
        itemList,
      } = payload;

      if ((page === 1) || (!state.assignedTasks.itemList)) {
        state.assignedTasks.itemList = itemList;
      } else {
        state.assignedTasks.itemList = [
          ...state.assignedTasks.itemList,
          ...itemList
        ];
      }

      state.assignedTasks.page = page;
      state.assignedTasks.canLoadMore = canLoadMore;
      state.assignedTasks.isLoading = false;
    });
  }
});

export const {

} = dashboardSlice.actions;

export default dashboardSlice.reducer;
