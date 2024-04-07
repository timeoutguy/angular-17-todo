export type Todo = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    user_id: number;
}

export type TodoRequestResponse = {
  data: Todo[];
  success: boolean;
}
