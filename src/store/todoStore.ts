import { create } from 'zustand';
import { Todo } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  searchQuery: string;
  theme: 'light' | 'dark';
  addTodo: (title: string, description?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  setSearchQuery: (query: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  reorderTodos: (todos: Todo[]) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  filter: 'all',
  searchQuery: '',
  theme: 'light',
  addTodo: (title, description) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: crypto.randomUUID(),
          title,
          description,
          completed: false,
          createdAt: new Date(),
        },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  updateTodo: (id, updates) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    })),
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setTheme: (theme) => set({ theme }),
  reorderTodos: (todos) => set({ todos }),
}));