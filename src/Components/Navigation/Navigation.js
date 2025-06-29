import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div class="navigation">
            <div class="logo"></div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/reviews">Reviews</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;