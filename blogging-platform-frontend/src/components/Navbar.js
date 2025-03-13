import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 p-4">
            <ul className="flex space-x-4">
                <li><Link to="/" className="text-white">Home</Link></li>
                <li><Link to="/about" className="text-white">About</Link></li>
                <li><button onClick={handleLogout} className="text-white">Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
