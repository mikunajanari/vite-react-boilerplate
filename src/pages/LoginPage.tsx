import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import api from "../api/axios";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // eslint-disable-next-line unicorn/prevent-abbreviations,@typescript-eslint/explicit-function-return-type
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            const token = response.data.token;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            localStorage.setItem("boilerplate_token", token);
            await navigate({to: "/entities"});
        } catch (error) {
            alert("Login failed");
            console.error(error);
        }
    };

    return (
        <form className="flex flex-col gap-2 w-80 mx-auto mt-10" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold">Login</h2>
            <input
                required
                className="border p-2"
                placeholder="Email"
                type="email"
                value={email}
                /* eslint-disable-next-line unicorn/prevent-abbreviations */
                onChange={(e) => { setEmail(e.target.value); }}
            />
            <input
                required
                className="border p-2"
                placeholder="Password"
                type="password"
                value={password}
                /* eslint-disable-next-line unicorn/prevent-abbreviations */
                onChange={(e) => { setPassword(e.target.value); }}
            />
            <button className="bg-blue-500 text-white py-2 rounded" type="submit">
                Login
            </button>
        </form>
    );
}
