import TaskStatusType from "@/type/task/TaskStatusType";

export const taskStatusIntToString = (statusIntValue: number): TaskStatusType => {
  switch (statusIntValue) {
    case 0: return 'New';
    case 1: return 'In Progress';
    case 5: return 'On Review';
    case 10: return 'Done';
    case 100:
    default:
      return 'Archived'
  }
}

export const taskStatusStringToInt = (status: TaskStatusType): number => {
  switch (status) {
    case 'New': return 0;
    case 'In Progress': return 1;
    case 'On Review': return 5;
    case 'Done': return 10;
    case 'Archived':
    default:
      return 100;
  }
}
