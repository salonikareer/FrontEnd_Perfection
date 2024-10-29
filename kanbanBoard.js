import React, { useState } from 'react';
import { Plus, X, GripHorizontal } from 'lucide-react';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      title: 'To Do',
      items: [
        { id: '1', content: 'Learn React', color: 'from-blue-50 to-blue-100' },
        { id: '2', content: 'Build a project', color: 'from-green-50 to-green-100' }
      ]
    },
    inProgress: {
      title: 'In Progress',
      items: [
        { id: '3', content: 'Study JavaScript', color: 'from-yellow-50 to-yellow-100' }
      ]
    },
    done: {
      title: 'Done',
      items: [
        { id: '4', content: 'Setup development environment', color: 'from-purple-50 to-purple-100' }
      ]
    }
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedColumn, setDraggedColumn] = useState(null);

  const colors = [
    'from-blue-50 to-blue-100',
    'from-green-50 to-green-100',
    'from-yellow-50 to-yellow-100',
    'from-purple-50 to-purple-100',
    'from-pink-50 to-pink-100',
    'from-indigo-50 to-indigo-100'
  ];

  const handleDragStart = (e, item, columnId) => {
    setDraggedItem(item);
    setDraggedColumn(columnId);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
    setDraggedColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    
    if (!draggedItem || columnId === draggedColumn) return;

    setColumns(prev => {
      const newColumns = { ...prev };
      newColumns[draggedColumn].items = newColumns[draggedColumn].items.filter(
        item => item.id !== draggedItem.id
      );
      newColumns[columnId].items.push(draggedItem);
      return newColumns;
    });
  };

  const addNewTask = () => {
    if (!newTaskText.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      content: newTaskText,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setColumns(prev => ({
      ...prev,
      todo: {
        ...prev.todo,
        items: [...prev.todo.items, newTask]
      }
    }));
    setNewTaskText('');
  };

  const deleteTask = (columnId, taskId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter(item => item.id !== taskId)
      }
    }));
  };

  const getColumnStyle = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'border-blue-200 bg-blue-50/30';
      case 'inProgress':
        return 'border-yellow-200 bg-yellow-50/30';
      case 'done':
        return 'border-green-200 bg-green-50/30';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Project Tasks</h1>
        
        <div className="mb-8">
          <div className="flex gap-3 max-w-md">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                placeholder="Add a new task..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
              />
            </div>
            <button
              onClick={addNewTask}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className={`rounded-xl border ${getColumnStyle(columnId)} p-4 shadow-sm`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, columnId)}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">{column.title}</h2>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600 shadow-sm">
                  {column.items.length}
                </span>
              </div>

              <div className="space-y-3">
                {column.items.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, columnId)}
                    onDragEnd={handleDragEnd}
                    className={`bg-gradient-to-r ${item.color} p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-move relative group border border-gray-100`}
                  >
                    <div className="flex items-center gap-2">
                      <GripHorizontal size={16} className="text-gray-400" />
                      <p className="text-gray-700 flex-1">{item.content}</p>
                      <button
                        onClick={() => deleteTask(columnId, item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 p-1 rounded"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
