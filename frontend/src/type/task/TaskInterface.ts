import UserInterface from "@/type/user/UserInterface";
import TaskStatusType from "@/type/task/TaskStatusType";

export default interface TaskInterface {
  id: number,
  title: string,
  content: string,
  creator: UserInterface,
  doer?: UserInterface|null,
  status: TaskStatusType,
  created_at: string,
  updated_at: string,
}
