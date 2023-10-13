import React, {useMemo} from 'react';
import classes from './DashboardTask.module.scss';
import TaskInterface from "@/type/task/TaskInterface";
import clsx from "clsx";
import {fullNameToTwoLetters} from "@/tool/common/StringTools";
import Link from "next/link";

interface DashboardTaskPropsInterface {
  task: TaskInterface|null,
  isLoading: boolean,
}

const DashboardTask: React.FC<DashboardTaskPropsInterface> = (
  {
    task,
    isLoading,
  }
) => {
  const creatorLogoString = useMemo(() => {
   return fullNameToTwoLetters(task?.creator?.name || null);
  }, [task]);

  const doerLogoString = useMemo(() => {
    return fullNameToTwoLetters(task?.doer?.name || null);
  }, [task]);

  return (
    <Link
      href={''}
      className={clsx({
        [classes.Task]: true,
        [classes.Task_loading]: isLoading,
      })}
    >
      {(!isLoading && (!!task)) && (
        <>
          <em className={classes.Task__UserLogo}>{creatorLogoString}</em>
          <em className={classes.Task__DelegationIcon} />
          <em className={classes.Task__UserLogo}>{doerLogoString}</em>
          <div className={classes.Task__Description}>
            <strong>{task.title}</strong>
            Assigned to: {task.doer ? task.doer.name : 'no one'}
          </div>
        </>
      )}
    </Link>
  )
};

export default DashboardTask;
