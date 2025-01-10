import React from 'react';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

export const Statistics: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  
  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900">
        <div className="flex items-center gap-3">
          <ListTodo className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Tasks</h3>
        </div>
        <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {stats.total}
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900">
        <div className="flex items-center gap-3">
          <Circle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Active Tasks</h3>
        </div>
        <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          {stats.active}
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 p-4 rounded-xl border border-green-100 dark:border-green-900">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Completed</h3>
        </div>
        <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
          {stats.completed}
        </p>
      </div>
    </div>
  );
};