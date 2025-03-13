import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Fetch specific post by ID
        fetch(`http://localhost:5001/api/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-lg">{post.content}</p>
            </div>
        </div>
    );
};

export default PostPage;
