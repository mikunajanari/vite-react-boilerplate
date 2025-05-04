import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Post } from "../api/mockApi";
// eslint-disable-next-line no-duplicate-imports
import { getAllEntities, deleteEntity } from "../api/mockApi";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export default function EntitiesList() {
    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        // Use void to ignore the promise and avoid ESLint warning
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        void (async () => {
            try {
                const entities = await getAllEntities();
                setPosts(entities);
            } catch (error) {
                console.error("Failed to fetch entities:", error);
            }
        })();
    }, []);
    

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleDelete = async (id: number) => {
        if (confirm("Ви впевнені, що хочете видалити?")) {
            await deleteEntity(id);
            const updated = await getAllEntities();
            setPosts(updated);
        }
    };

    return (
        <div>
            <h1>Список постів</h1>
            <Link to="/entities/new">➕ Створити новий</Link>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <span style={{ marginRight: "1rem" }}><strong>ID:</strong> {post.id}</span>
                        <Link to={`/entities/${post.id}`}>{post.title}</Link>
                        <button
                            style={{ marginLeft: "1rem" }}
                            onClick={() => handleDelete(post.id)}
                        >
                            Видалити
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
