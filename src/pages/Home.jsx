import { useSelector } from "react-redux";

const Home = () => {
    const theme = useSelector(state => state.ui.theme)
    const cars = useSelector(state => state.ui.cars) // Получаем машины из Store

    return (
        <main style={{
            padding: "40px",
            minHeight: "80vh",
            background: theme === "light" ? "#f5f5f5" : "#1a1a1a",
            color: theme === 'light' ? "#000" : "#fff",
            transition: "0.3s"
        }}>

            <h2 style={{ borderLeft: "5px solid #0066b1", paddingLeft: "15px" }}>
                Актуальный модельный ряд BMW
            </h2>
            
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "30px"
            }}>
                {cars.map(car => (
                    <div key={car.id} style={{
                        padding: "20px",
                        borderRadius: "12px",
                        background: theme === "light" ? "#fff" : "#2d2d2d",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        border: theme === "dark" ? "1px solid #444" : "none"
                    }}>
                        <h3 style={{ color: "#0066b1", margin: "0 0 10px 0" }}>{car.model}</h3>
                        <p><strong>Год:</strong> {car.year}</p>
                        <p style={{ fontSize: "14px", opacity: 0.8 }}>{car.specs}</p>
                        <button style={{
                            marginTop: "10px",
                            padding: "8px 16px",
                            background: "#0066b1",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}>
                            Подробнее
                        </button>
                    </div>
                ))}
            </div>

        </main>
    )
}

export default Home