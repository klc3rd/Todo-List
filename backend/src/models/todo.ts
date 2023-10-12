export interface Todo {
  id?: string;
  title: string;
  body: string;
  completedOn?: Date;
  createdOn?: Date;
  status?: string;
}
