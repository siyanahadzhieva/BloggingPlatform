import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch posts
        fetch('http://localhost:5001/api/posts')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log('Response data:', data); // Log the response data
                if (data.$values && Array.isArray(data.$values)) {
                    setPosts(data.$values);
                } else {
                    setError('Data is not an array');
                }
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold text-center mb-6">Blog Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <div key={post.id} className="border p-4 rounded-lg">
                            <h2 className="text-2xl font-semibold">{post.title}</h2>
                            <p>{post.content.substring(0, 100)}...</p>
                            <Link to={`/post/${post.id}`} className="text-blue-600">Read more</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
