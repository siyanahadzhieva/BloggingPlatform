import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" component={<LoginPage />} />
                <Route path="/register" component={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/post/:id" element={<PostPage />} />
            </Routes>
        </Router>
    );
}

export default App;
