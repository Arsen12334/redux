import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../features/auth/authSlice";

const Auth = () => {
    const [isReg, setIsReg] = useState(false);
    const [form, setForm] = useState({ login: "", password: "" });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isReg) {
            dispatch(register(form));
            setIsReg(false);
        } else {
            dispatch(login(form));
        }
    };

    return (
        <div className="auth-screen" style={{
            height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000'
        }}>
            <form onSubmit={handleSubmit} className="model-card" style={{ width: '350px', padding: '40px' }}>
                <h2 style={{ marginBottom: '20px' }}>{isReg ? "РЕГИСТРАЦИЯ" : "ВХОД"}</h2>
                <input 
                    className="bmw-input" 
                    placeholder="Логин" 
                    onChange={e => setForm({...form, login: e.target.value})}
                    style={{ width: '100%', marginBottom: '15px', padding: '12px' }}
                />
                <input 
                    className="bmw-input" 
                    type="password" 
                    placeholder="Пароль" 
                    onChange={e => setForm({...form, password: e.target.value})}
                    style={{ width: '100%', marginBottom: '25px', padding: '12px' }}
                />
                <button type="submit" className="bmw-action-btn" style={{ width: '100%' }}>
                    {isReg ? "СОЗДАТЬ АККАУНТ" : "ВОЙТИ"}
                </button>
                <p 
                    onClick={() => setIsReg(!isReg)} 
                    style={{ cursor: 'pointer', marginTop: '20px', fontSize: '12px', textAlign: 'center', color: '#0066b1' }}
                >
                    {isReg ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
                </p>
            </form>
        </div>
    );
};

export default Auth;