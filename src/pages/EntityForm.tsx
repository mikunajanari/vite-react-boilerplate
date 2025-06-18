import type { FormEvent } from "react";
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react";
import type { Post } from "../api/mockApi";
// eslint-disable-next-line no-duplicate-imports
import { getEntityById, updateEntity, createEntity } from "../api/mockApi";
import { useParams, useNavigate } from "@tanstack/react-router";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export default function EntityForm() {

    const parameters = useParams({ strict: false });
    const isNew = parameters.id === undefined;

    const navigate = useNavigate();

    const [post, setPost] = useState<Omit<Post, "id">>({ title: "", content: "" });

    useEffect(() => {
        // Use void to ignore the promise and prevent ESLint warning
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        void (async () => {

            if (!isNew && parameters.id) {

                const id = parseInt(parameters.id);
                try {
                    const data = await getEntityById(id);
                    if (data) {
                        setPost({ title: data.title, content: data.content });
                    }
                } catch (error) {
                    console.error("Failed to fetch entity:", error);
                }
            }
        })();

    }, [parameters.id, isNew]);


    const handleChange = (
        // eslint-disable-next-line unicorn/prevent-abbreviations
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,unicorn/prevent-abbreviations
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Форма відправлена", post);
        console.log("isNew:", isNew);

        if (!post.title || !post.content) {
            alert("Усі поля обов’язкові");
            return;
        }

        try {
            if (isNew) {
                await createEntity(post);

            } else if (parameters.id) {

                const id = parseInt(parameters.id);
                await updateEntity(id, post);
            }
            await navigate({ to: "/entities" });
        } catch (error) {
            console.error("Failed to submit entity:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isNew ? "Створення поста" : "Редагування поста"}</h2>
            <input
                name="title"
                placeholder="Заголовок"
                value={post.title}
                onChange={handleChange}
            />
            <textarea
                name="content"
                placeholder="Текст поста"
                value={post.content}
                onChange={handleChange}
            />
            <button type="submit">{isNew ? "Create" : "Update"}</button>
        </form>
    );
}
