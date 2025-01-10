import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { Trash2, GripVertical, Check, Edit2, X, Save } from 'lucide-react';
import { Todo } from '../types/todo';
import { useTodoStore } from '../store/todoStore';
import clsx from 'clsx';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, {
        title: editTitle,
        description: editDescription || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'group flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-500/10',
        isDragging && 'shadow-2xl scale-105 neon-glow',
        todo.completed && 'bg-gray-50 dark:bg-gray-900'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <button
        onClick={() => toggleTodo(todo.id)}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300',
          todo.completed
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-transparent shadow-lg shadow-green-500/25'
            : 'border-gray-300 dark:border-gray-600 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/25'
        )}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>

      <div className="flex-grow min-w-0">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 transition-all duration-200"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 resize-none transition-all duration-200"
              rows={2}
            />
          </div>
        ) : (
          <>
            <h3
              className={clsx(
                'text-gray-900 dark:text-gray-100 font-medium truncate group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200',
                todo.completed && 'line-through text-gray-500 dark:text-gray-400'
              )}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={clsx(
                  'text-sm text-gray-500 dark:text-gray-400 truncate',
                  todo.completed && 'line-through'
                )}
              >
                {todo.description}
              </p>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Created {format(todo.createdAt, 'PPp')}
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 text-green-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors duration-200"
            >
              <Save className="w-5 h-5" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-500/10 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};