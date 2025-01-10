import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { SearchBar } from './components/SearchBar';
import { ThemeToggle } from './components/ThemeToggle';
import { Statistics } from './components/Statistics';
import { ShareButton } from './components/ShareButton';
import { ClipboardList } from 'lucide-react'; 

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <ThemeToggle />
      <ShareButton />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-[0_0_30px_rgba(59,130,246,0.2)] dark:shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <ClipboardList className="w-20 h-20 text-blue-500 dark:text-blue-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
            Taskalicious
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            Organize your tasks with  Taskalicious Application with the capabilty of draging and droping functionality
          </p>
        </div>

        <Statistics />

        <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
          <TodoForm />
        </div>

        <div className="space-y-6">
          <SearchBar />
          <TodoFilter />
        </div>

        <div className="mt-8">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;