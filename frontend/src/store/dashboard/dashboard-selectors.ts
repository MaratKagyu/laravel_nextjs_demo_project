import {RootState} from "@/store";

export const selectCreatedTasks = (state: RootState) => {
  return state.dashboard.createdTasks;
}

export const selectAssignedTasks = (state: RootState) => {
  return state.dashboard.assignedTasks;
}

export const selectArchivedTasks = (state: RootState) => {
  return state.dashboard.archivedTasks;
}
