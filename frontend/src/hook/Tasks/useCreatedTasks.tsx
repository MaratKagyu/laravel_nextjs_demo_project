import {useAppDispatch, useAppSelector} from "@/hook/store-hooks";
import {useCallback, useEffect, useMemo} from "react";
import TaskInterface from "@/type/task/TaskInterface";
import {selectCreatedTasks} from "@/store/dashboard/dashboard-selectors";
import {loadCreatedTasks} from "@/store/dashboard/dashboard-thunks";

interface UseCreatedTasksInterface {
  page: number,
  canLoadMore: boolean,
  itemList: TaskInterface[]|null,
  isLoading: boolean,
  loadMore: () => any,
}
const useCreatedTasks = (): UseCreatedTasksInterface => {
  const dispatch = useAppDispatch();
  const createdTasks = useAppSelector(selectCreatedTasks);

  const loadMore = useCallback(() => {
    if (createdTasks.canLoadMore && (!createdTasks.isLoading)) {
      dispatch(loadCreatedTasks({
        page: createdTasks.itemList ? createdTasks.page + 1 : 1
      }))
    }
  }, [dispatch, createdTasks]);

  const result: UseCreatedTasksInterface = useMemo(() => {
    return {
      ...createdTasks,
      loadMore: loadMore,
    }
  }, [createdTasks, loadMore])

  useEffect(() => {
    if (createdTasks.isLoading || createdTasks.itemList) {
      return;
    }
    loadMore();
  }, [createdTasks, loadMore]);

  return result;
};

export default useCreatedTasks;

