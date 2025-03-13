import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage'; // Example component
import PostPage from './pages/PostPage'; // Example component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/post/:id" element={<PostPage />} />
            </Routes>
        </Router>
    );
}

export default App;
