"use client";
import React from 'react';
import classes from './Dashboard.module.scss';
import useCreatedTasks from "@/hook/Tasks/useCreatedTasks";
import useAssignedTasks from "@/hook/Tasks/useAssignedTasks";
import Accordion from "@/component/Accordion/Accordion";
import DashboardTask from "@/component/Dashboard/DashboardTask/DashboardTask";
import TaskInterface from "@/type/task/TaskInterface";

const Dashboard: React.FC = () => {
  const createdTasks = useCreatedTasks();
  const assignedTasks = useAssignedTasks();

  return (
    <div>
      <Accordion title="You created">
        {createdTasks.itemList ? (
          <div className={classes.TaskList}>
            {createdTasks.itemList.map((task: TaskInterface, key) => (
              <DashboardTask
                task={task}
                isLoading={false}
                key={key}
              />
            ))}
          </div>
        ) : (
          <div className={classes.TaskList}>
            <DashboardTask task={null} isLoading={true} />
            <DashboardTask task={null} isLoading={true} />
            <DashboardTask task={null} isLoading={true} />
          </div>
        )}
      </Accordion>
      <Accordion title="Assigned to You">
        {assignedTasks.itemList ? (
          <div className={classes.TaskList}>
            {assignedTasks.itemList.map((task: TaskInterface, key) => (
              <DashboardTask
                task={task}
                isLoading={false}
                key={key}
              />
            ))}
          </div>
        ) : (
          <div className={classes.TaskList}>
            <DashboardTask task={null} isLoading={true} />
            <DashboardTask task={null} isLoading={true} />
            <DashboardTask task={null} isLoading={true} />
          </div>
        )}
      </Accordion>
    </div>
  )
};

export default Dashboard;
