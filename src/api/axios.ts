import axios from "axios";

// Створення окремого інстансу Axios
const api = axios.create({
    baseURL: import.meta.env["VITE_API_BASE_URL"],
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Якщо є токен у .env — (наприклад, при тестуванні)
        const fallbackToken = import.meta.env["VITE_API_AUTH_TOKEN"];
        if (fallbackToken) {
            config.headers.Authorization = `Bearer ${fallbackToken}`;
        }
    }
    return config;
});

// Інтерцептор для відповіді (обробка помилок)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
