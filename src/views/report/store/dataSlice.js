import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetReport } from "services/ReportService";

export const getReport = createAsyncThunk("dumyUsers/getReport", async () => {
  const response = await apiGetReport();
  return response.data;
});

const dataSlice = createSlice({
  name: "dumyUsers/data",
  initialState: {
    loading: false,
    listUsers: [],
    userLoading: false,
  },
  reducers: {
    // setTableData: (state, action) => {
    //   state.tableData = action.payload;
    // },
    // setCustomerList: (state, action) => {
    //   state.customerList = action.payload;
    // },
    // setFilterData: (state, action) => {
    //   state.filterData = action.payload;
    // },
  },
  extraReducers: {
    [getReport.pending]: (state) => {
      state.userLoading = true;
    },
    [getReport.fulfilled]: (state, action) => {
      state.listUsers = action.payload.users;
      state.userLoading = false;
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
