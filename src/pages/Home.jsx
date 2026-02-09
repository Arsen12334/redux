import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstruments, setItemDetail, clearDetail } from "../features/instruments/instrumentsSlice";
import "./Home.css";

const Home = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ui.theme);
    const { items, status, selectedItem } = useSelector(state => state.instruments);

    useEffect(() => {
        if (status === "idle") dispatch(fetchInstruments());
    }, [status, dispatch]);

    // Detail View (Одиночная карточка)
    if (selectedItem) {
        return (
            <div className={`home-container ${theme} detail-view`} style={{padding: '100px 8%'}}>
                <button className="card-link" style={{background: 'none', border: 'none', cursor: 'pointer', color: '#0066b1'}} onClick={() => dispatch(clearDetail())}>
                    ← НАЗАД К ОБЗОРУ
                </button>
                <h1 className="hero-title" style={{fontSize: '80px'}}>{selectedItem.title}</h1>
                <p className="hero-subtitle">{selectedItem.specs}</p>
                <p style={{maxWidth: '700px', lineHeight: '1.8'}}>{selectedItem.body}</p>
            </div>
        );
    }

    return (
        <main className={`home-container ${theme}`}>
            <section className="hero-banner">
                <div className="hero-content">
                    <span className="hero-label">T H E</span>
                    <h1 className="hero-title">i5</h1>
                    <p className="hero-subtitle">100% электрический. 100% BMW.</p>
                    <button className="bmw-action-btn">Узнать больше</button>
                </div>
            </section>

            <section className="models-section">
                <h2 className="section-header">Выберите свой BMW</h2>
                
                {status === "loading" ? (
                    <div style={{textAlign: 'center', padding: '50px', fontSize: '20px', letterSpacing: '2px'}}>
                        ЗАГРУЗКА...
                    </div>
                ) : (
                    <div className="models-grid">
                        {items.map(car => (
                            <div key={car.id} className="model-card" onClick={() => dispatch(setItemDetail(car))}>
                                <div>
                                    <h3 className="card-title">{car.title}</h3>
                                    <p className="card-specs">{car.specs}</p>
                                </div>
                                <div className="card-link">Подробнее →</div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Home;