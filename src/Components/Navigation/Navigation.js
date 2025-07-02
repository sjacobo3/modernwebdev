import './Navigation.css'
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="nav-logo"></div>
            <div className="nav-bar">
                <div className="nav-item">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav-item">
                        <Link to="/reviews">Reviews</Link>
                </div>
            </div>
        </div>
    );
};

export default Navigation;