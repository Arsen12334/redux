import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import { logout } from "../features/auth/authSlice"; // Добавили импорт выхода
import "./Header.css";

const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ui.theme);
    const user = useSelector(state => state.auth.user); // Достаем данные юзера для приветствия

    const navigation = [
        "Автомобили",
        "Электромобили",
        "Онлайн магазин",
        "Больше о BMW"
    ];

    return (
        <header className={`bmw-header ${theme}`}>
            <div className="header-left">
                <div className="bmw-logo-container">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" 
                        alt="BMW Logo" 
                        className="bmw-logo-img"
                    />
                </div>

                <nav>
                    <ul className="nav-menu">
                        {navigation.map((item, index) => (
                            <li key={index} className="nav-link">
                                {item}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Отображаем имя пользователя рядом с кнопками */}
                {user && (
                    <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.8 }}>
                        {user.login}
                    </span>
                )}

                <button className="theme-btn" onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? "🌙 Тёмная тема" : "☀️ Светлая тема"}
                </button>

                {/* Кнопка выхода в стиле BMW */}
                <button 
                    className="logout-btn" 
                    onClick={() => dispatch(logout())}
                    style={{
                        background: '#e02020',
                        color: 'white',
                        border: 'none',
                        padding: '8px 15px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        borderRadius: '2px'
                    }}
                >
                    ВЫЙТИ
                </button>
            </div>
        </header>
    );
}

export default Header;