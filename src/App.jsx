import { useSelector } from "react-redux"; // Импортируем хук для доступа к store
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./components/Auth"; // Твой новый компонент авторизации

function App() {
  // Вытаскиваем флаг авторизации из нашего authSlice
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <>
      {/* Логика Middleware: 
          Если залогинен (isAuth === true), показываем сайт.
          Если нет — принудительно рендерим форму входа.
      */}
      {isAuth ? (
        <>
          <Header />
          <Home />
          <Footer />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;