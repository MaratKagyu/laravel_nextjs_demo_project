import TaskInterface from "@/type/task/TaskInterface";

export default interface DashboardSliceInterface {
  createdTasks: {
    page: number,
    canLoadMore: boolean,
    itemList: TaskInterface[]|null,
    isLoading: boolean,
  },
  assignedTasks: {
    page: number,
    canLoadMore: boolean,
    itemList: TaskInterface[]|null,
    isLoading: boolean,
  },
  archivedTasks: {
    page: number,
    canLoadMore: boolean,
    itemList: TaskInterface[]|null,
    isLoading: boolean,
  }
}
