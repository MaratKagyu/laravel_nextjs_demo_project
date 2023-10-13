import BeTaskDataInterface from "@/type/task/BeTaskDataInterface";

export default interface BeTaskListDataInterface {
  current_page: number,
  next_page_url: string|null,
  data: BeTaskDataInterface[],
}
