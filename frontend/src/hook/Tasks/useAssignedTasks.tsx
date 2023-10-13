import {useAppDispatch, useAppSelector} from "@/hook/store-hooks";
import {useCallback, useEffect, useMemo} from "react";
import TaskInterface from "@/type/task/TaskInterface";
import {selectAssignedTasks} from "@/store/dashboard/dashboard-selectors";
import {loadAssignedTasks} from "@/store/dashboard/dashboard-thunks";

interface UseCreatedTasksInterface {
  page: number,
  canLoadMore: boolean,
  itemList: TaskInterface[]|null,
  isLoading: boolean,
  loadMore: () => any,
}
const useAssignedTasks = (): UseCreatedTasksInterface => {
  const dispatch = useAppDispatch();
  const assignedTasks = useAppSelector(selectAssignedTasks);

  const loadMore = useCallback(() => {
    if (assignedTasks.canLoadMore && (!assignedTasks.isLoading)) {
      dispatch(loadAssignedTasks({
        page: assignedTasks.itemList ? assignedTasks.page + 1 : 1
      }))
    }
  }, [dispatch, assignedTasks]);

  const result: UseCreatedTasksInterface = useMemo(() => {
    return {
      ...assignedTasks,
      loadMore: loadMore,
    }
  }, [assignedTasks, loadMore])

  useEffect(() => {
    if (assignedTasks.isLoading || assignedTasks.itemList) {
      return;
    }
    loadMore();
  }, [assignedTasks, loadMore]);

  return result;
};

export default useAssignedTasks;

