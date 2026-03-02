import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchInstruments, 
    setItemDetail, 
    clearDetail, 
    addInstrument, 
    deleteInstrument, 
    updateInstrument 
} from "../features/instruments/instrumentsSlice";
import "./Home.css";

const Home = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ui.theme);
    const { items, status, selectedItem } = useSelector(state => state.instruments);

    const [title, setTitle] = useState("");
    const [engine, setEngine] = useState("");
    const [power, setPower] = useState("");

    useEffect(() => {
        if (status === "idle") dispatch(fetchInstruments());
    }, [status, dispatch]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newCar = {
            id: Date.now(),
            title: title,
            specs: `${engine || "Electric"} / ${power || "500"} hp`,
            body: "Новая модель добавлена в конфигуратор BMW."
        };

        dispatch(addInstrument(newCar));
        
        setTitle("");
        setEngine("");
        setPower("");
    };

    const handleEdit = (car) => {
        const newTitle = prompt("Введите новое название модели:", car.title);
        if (newTitle && newTitle.trim()) {
            dispatch(updateInstrument({ id: car.id, title: newTitle }));
        }
    };

    if (selectedItem) {
        return (
            <div className={`home-container ${theme} detail-view`} style={{padding: '100px 8%'}}>
                <button 
                    className="action-link details-link" 
                    onClick={() => dispatch(clearDetail())}
                    style={{marginBottom: '30px'}}
                >
                    ← НАЗАД К ОБЗОРУ
                </button>
                <div className="detail-content" style={{display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap'}}>
                    <div style={{flex: '1', minWidth: '300px'}}>
                        <h1 className="hero-title" style={{fontSize: '60px', margin: '10px 0'}}>{selectedItem.title}</h1>
                        <p className="hero-subtitle" style={{fontSize: '24px', color: '#666'}}>{selectedItem.specs}</p>
                        <p style={{maxWidth: '600px', lineHeight: '1.8', marginTop: '30px'}}>{selectedItem.body}</p>
                    </div>
                    {/* Фото в детальном просмотре */}
                    <div style={{flex: '1', minWidth: '300px'}}>
                        <img src={selectedItem.img} alt={selectedItem.title} style={{width: '100%', height: 'auto', objectFit: 'contain'}} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className={`home-container ${theme}`}>
            <section className="hero-banner" style={{padding: '100px 8%'}}>
                <span className="hero-label" style={{letterSpacing: '5px'}}>T H E</span>
                <h1 className="hero-title" style={{fontSize: 120, margin: 0}}>i5</h1>
                <p className="hero-subtitle">100% электрический. 100% BMW.</p>
            </section>

            <section className="models-section">
                <h2 className="section-header">Конфигуратор новых моделей</h2>

                <form onSubmit={handleAdd} className="crud-form" style={{
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '15px', 
                    marginBottom: '60px',
                    padding: '30px',
                    borderRadius: '8px'
                }}>
                    <input 
                        className="bmw-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Название (напр. BMW M8)"
                        style={{padding: '12px', flex: '1', minWidth: '200px'}}
                    />
                    <input 
                        className="bmw-input"
                        value={engine}
                        onChange={(e) => setEngine(e.target.value)}
                        placeholder="Двигатель (Electric/V8)"
                        style={{padding: '12px', flex: '1', minWidth: '200px'}}
                    />
                    <input 
                        className="bmw-input"
                        value={power}
                        onChange={(e) => setPower(e.target.value)}
                        placeholder="Мощность (hp)"
                        style={{padding: '12px', width: '130px'}}
                    />
                    <button type="submit" className="bmw-action-btn">
                        СОЗДАТЬ
                    </button>
                </form>

                {status === "loading" ? (
                    <div className="loading-spinner" style={{textAlign: 'center', padding: '100px', letterSpacing: '3px'}}>ЗАГРУЗКА...</div>
                ) : (
                    <div className="models-grid">
                        {items.map(car => (
                            <div key={car.id} className="model-card">
                                <div onClick={() => dispatch(setItemDetail(car))} style={{cursor: 'pointer'}}>
                                    {/* Блок с изображением */}
                                    <div className="card-image-container">
                                        <img src={car.img} alt={car.title} className="card-car-image" />
                                    </div>
                                    <h3 className="card-title">{car.title}</h3>
                                    <p className="card-specs">{car.specs}</p>
                                </div>
                                
                                <div className="card-actions">
                                    <div style={{display: 'flex', gap: '15px'}}>
                                        <button 
                                            onClick={() => dispatch(deleteInstrument(car.id))}
                                            className="action-link delete-btn"
                                        >
                                            УДАЛИТЬ
                                        </button>
                                        <button 
                                            onClick={() => handleEdit(car)}
                                            className="action-link"
                                            style={{color: '#888', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px'}}
                                        >
                                            ИЗМЕНИТЬ
                                        </button>
                                    </div>
                                    <div 
                                        onClick={() => dispatch(setItemDetail(car))} 
                                        className="action-link details-link"
                                    >
                                        ДЕТАЛИ →
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Home;