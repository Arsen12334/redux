import { useSelector } from "react-redux";

const TodoDetail = ({ todoId, onClose }) => {
    // GET ID logic: находим конкретный объект в массиве по ID
    const todo = useSelector((state) => 
        state.todos.items.find((item) => item.id === todoId)
    );

    // Если задача была удалена, пока мы на неё смотрели
    if (!todo) return <div style={{ color: '#888' }}>Задача не найдена...</div>;

    return (
        <div style={{ 
            background: '#222', 
            padding: '25px', 
            border: '1px solid #0066b1',
            position: 'relative',
            animation: 'fadeIn 0.3s ease'
        }}>
            <button 
                onClick={onClose}
                style={{ 
                    position: 'absolute', top: '10px', right: '10px', 
                    background: 'none', border: 'none', color: '#666', cursor: 'pointer' 
                }}
            >
                ✕
            </button>

            <h3 style={{ color: '#0066b1', marginTop: 0, fontSize: '14px', letterSpacing: '1px' }}>
                ДЕТАЛЬНАЯ ИНФОРМАЦИЯ
            </h3>
            
            <div style={{ margin: '20px 0' }}>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>ID ОБЪЕКТА:</p>
                <code style={{ color: '#aaa', fontSize: '14px' }}>{todo.id}</code>
            </div>

            <div style={{ margin: '20px 0' }}>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>ОПИСАНИЕ ЗАДАЧИ:</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{todo.text}</p>
            </div>

            <div style={{ margin: '20px 0' }}>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>СТАТУС ГОТОВНОСТИ:</p>
                <span style={{ 
                    padding: '4px 10px', 
                    background: todo.completed ? '#28a745' : '#ffc107',
                    color: '#000',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    borderRadius: '2px'
                }}>
                    {todo.completed ? "ВЫПОЛНЕНО" : "В ОЖИДАНИИ"}
                </span>
            </div>

            <p style={{ fontSize: '10px', color: '#444', marginTop: '30px' }}>
                Данные синхронизированы с бортовым компьютером BMW
            </p>
        </div>
    );
};

export default TodoDetail;