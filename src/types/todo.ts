export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date; 
}

export interface todostate {
  todos: Todo[];
  loading: boolean;
  error: null | string; 
}