import React from 'react';
import { useTodoStore } from '../store/todoStore';
import clsx from 'clsx';

export const TodoFilter: React.FC = () => {
  const { filter, setFilter } = useTodoStore((state) => ({
    filter: state.filter,
    setFilter: state.setFilter,
  }));

  const filters: Array<{ label: string; value: 'all' | 'active' | 'completed' }> = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex justify-center gap-2 mb-8">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={clsx(
            'px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            filter === value
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};