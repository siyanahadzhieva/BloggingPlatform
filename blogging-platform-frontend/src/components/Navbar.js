import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [profilePictureUrl, setProfilePictureUrl] = useState('/default-profile.png');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5001/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const user = response.data;
                if (user.profilePictureUrl) {
                    setProfilePictureUrl(user.profilePictureUrl);
                }
                setUserName(user.name);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">BlogApp</Link>
                <div className="flex items-center">
                    <span className="text-white mr-4">{userName}</span>
                    <Link to="/settings">
                        <img
                            src={profilePictureUrl}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="ml-4 text-white py-2 px-4 "
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

