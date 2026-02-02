import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import "./Header.css";

const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ui.theme);

    const navigation = [
        "Автомобили",
        "Электромобили",
        "Онлайн магазин",
        "Больше о BMW"
    ];

    return (
        <header className={`bmw-header ${theme}`}>
            <div className="header-left">
                {/* Заменяем иконку на изображение логотипа BMW */}
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

            <div className="header-right">
                <button className="theme-btn" onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? "🌙 Тёмная тема" : "☀️ Светлая тема"}
                </button>
            </div>
        </header>
    );
}

export default Header;