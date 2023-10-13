import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import API, {apiEndpoint, ApiErrorData} from "@/tool/API";
import TaskInterface from "@/type/task/TaskInterface";
import BeTaskListDataInterface from "@/type/task/BeTaskListDataInterface";
import {taskStatusIntToString} from "@/tool/Task/TaskTools";

export const loadCreatedTasks = createAsyncThunk<
  {
    page: number,
    canLoadMore: boolean,
    itemList: TaskInterface[],
  },
  { page: number },
  { rejectValue: ApiErrorData }
>(
  "dashboard/loadCreatedTasks",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await API.get(apiEndpoint.createdTasks(page));
      const taskListData = response.data as BeTaskListDataInterface;
      return {
        page: taskListData.current_page,
        canLoadMore: !!taskListData.next_page_url,
        itemList: taskListData.data.map((taskData) => ({
          ...taskData,
          status: taskStatusIntToString(taskData.status),
        })),
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue({
        errorCode: 'invalid_credentials',
        response: error.response.data,
      });
    }
  }
);

export const loadAssignedTasks = createAsyncThunk<
  {
    page: number,
    canLoadMore: boolean,
    itemList: TaskInterface[],
  },
  { page: number },
  { rejectValue: ApiErrorData }
>(
  "dashboard/loadAssignedTasks",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await API.get(apiEndpoint.assignedTasks(page));

      const taskListData = response.data as BeTaskListDataInterface;
      return {
        page: taskListData.current_page,
        canLoadMore: !!taskListData.next_page_url,
        itemList: taskListData.data.map((taskData) => ({
          ...taskData,
          status: taskStatusIntToString(taskData.status),
        })),
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue({
        errorCode: 'invalid_credentials',
        response: error.response.data,
      });
    }
  }
);

