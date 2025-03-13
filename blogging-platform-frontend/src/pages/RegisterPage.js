import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Registration failed");

            navigate("/login"); // Redirect to login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold">Register</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
                <button type="submit" className="bg-green-500 text-white p-2 w-full">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
