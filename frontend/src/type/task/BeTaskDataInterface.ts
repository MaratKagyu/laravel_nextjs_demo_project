import UserInterface from "@/type/user/UserInterface";

export default interface BeTaskDataInterface {
  id: number,
  title: string,
  content: string,
  creator: UserInterface,
  doer?: UserInterface|null,
  status: number,
  created_at: string,
  updated_at: string,
}
