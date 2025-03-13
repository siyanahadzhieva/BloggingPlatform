import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, PasswordHash: password }),
            });

            if (!response.ok) throw new Error("Invalid credentials");

            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/"); // Redirect to home page
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
            </form>
            <p className="mt-4">
                Don't have a profile? <Link to="/register" className="text-blue-500">Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;
