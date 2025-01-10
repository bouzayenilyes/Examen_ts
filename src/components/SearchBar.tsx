import React from 'react';
import { Search } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useTodoStore();

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
      />
    </div>
  );
};