import './Navigation.css'
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div class="navigation">
            <div class="nav-logo"></div>
            <div class="nav-bar">
                <div class="nav-item">
                    <Link to="/">Home</Link>
                </div>
                <div class="nav-item">
                        <Link to="/reviews">Reviews</Link>
                </div>
            </div>
        </div>
    );
};

export default Navigation;