import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TodoItem } from './TodoItem';
import { useTodoStore } from '../store/todoStore';

export const TodoList: React.FC = () => {
  const { todos, filter, searchQuery, reorderTodos } = useTodoStore((state) => ({
    todos: state.todos,
    filter: state.filter,
    searchQuery: state.searchQuery,
    reorderTodos: state.reorderTodos,
  }));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);
    const newTodos = arrayMove(todos, oldIndex, newIndex);
    reorderTodos(newTodos);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No tasks found
            </div>
          ) : (
            filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};