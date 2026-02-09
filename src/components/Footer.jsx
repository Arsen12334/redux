import "./Footer.css";

const Footer = () => {
    return (
        <footer className="bmw-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-column">
                        <h4>КОНТАКТЫ</h4>
                        <p>Найти дилера</p>
                        <p>Записаться на тест-драйв</p>
                    </div>
                    <div className="footer-column">
                        <h4>МИР BMW</h4>
                        <p>BMW Electrified</p>
                        <p>BMW M</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 BMW REDUX PROJECT. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;