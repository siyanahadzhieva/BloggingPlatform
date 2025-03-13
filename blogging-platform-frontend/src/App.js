import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import UserSettingsPage from './pages/UserSettingsPage';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<PrivateRoute element={HomePage} />} />
                <Route path="/settings" element={<PrivateRoute element={UserSettingsPage} />} />
                <Route path="/post/:id" element={<PrivateRoute element={PostPage} />} />
            </Routes>
        </Router>
    );
}

export default App;
