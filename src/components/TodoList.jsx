import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "../features/todos/todoSlice";
import TodoDetail from "./TodoDetail"; // Импортируем компонент деталей

const TodoList = () => {
    const [text, setText] = useState("");
    const [selectedId, setSelectedId] = useState(null); // Состояние для GET ID
    
    // 1. READ: Получаем список всех задач из Store
    const todos = useSelector((state) => state.todos.items);
    const dispatch = useDispatch();

    // 2. CREATE: Функция добавления
    const handleAdd = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTodo(text));
            setText("");
        }
    };

    return (
        <div className="todo-section" style={{ padding: '40px 8%', color: '#fff', background: '#111' }}>
            <h2 style={{ letterSpacing: '2px', borderLeft: '4px solid #0066b1', paddingLeft: '15px', marginBottom: '30px' }}>
                ПЛАН ТЕХОБСЛУЖИВАНИЯ
            </h2>

            {/* ФОРМА ДОБАВЛЕНИЯ (CREATE) */}
            <form onSubmit={handleAdd} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
                <input 
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Например: Замена масла M5..."
                    style={{ 
                        flex: 1, padding: '12px', background: '#222', 
                        border: '1px solid #444', color: '#fff', outline: 'none' 
                    }}
                />
                <button type="submit" style={{ 
                    padding: '12px 25px', background: '#0066b1', 
                    color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' 
                }}>
                    ДОБАВИТЬ
                </button>
            </form>

            {/* СПИСОК ЗАДАЧ (READ) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {todos.map((todo) => (
                        <li key={todo.id} style={{ 
                            background: '#1a1a1a', padding: '15px', marginBottom: '10px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            borderLeft: todo.completed ? '4px solid #28a745' : '4px solid #444'
                        }}>
                            <span 
                                onClick={() => dispatch(toggleTodo(todo.id))} // UPDATE (Status)
                                style={{ 
                                    cursor: 'pointer', 
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? '#666' : '#fff'
                                }}
                            >
                                {todo.text}
                            </span>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                {/* КНОПКА DETAIL (GET ID) */}
                                <button 
                                    onClick={() => setSelectedId(todo.id)}
                                    style={{ background: 'none', border: '1px solid #0066b1', color: '#0066b1', cursor: 'pointer', padding: '5px 10px', fontSize: '12px' }}
                                >
                                    INFO
                                </button>
                                
                                {/* DELETE: Удаление */}
                                <button 
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                    style={{ background: 'none', border: '1px solid #e02020', color: '#e02020', cursor: 'pointer', padding: '5px 10px', fontSize: '12px' }}
                                >
                                    УДАЛИТЬ
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* БЛОК ДЕТАЛЕЙ (GET ID / DETAIL) */}
                <div className="detail-panel">
                    {selectedId ? (
                        <TodoDetail 
                            todoId={selectedId} 
                            onClose={() => setSelectedId(null)} 
                        />
                    ) : (
                        <div style={{ border: '1px dashed #444', padding: '40px', textAlign: 'center', color: '#666' }}>
                            Выберите задачу для просмотра деталей
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoList;

