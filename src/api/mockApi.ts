import api from "./axios.ts";

export type Post = {
    id: number;
    title: string;
    content: string;
};

// GET /posts
export const getAllEntities = async (): Promise<Array<Post>> => {
    const response = await api.get("/post");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
};


// GET /posts/:id
export const getEntityById = async (id: number): Promise<Post> => {
    const response = await api.get(`/post/${id}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
};

// POST /posts
export const createEntity = async (data: Omit<Post, "id">): Promise<Post> => {
    const response = await api.post("/entities", data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
};

// PUT /posts/:id
export const updateEntity = async (id: number, data: Omit<Post, "id">): Promise<Post> => {
    const response = await api.put(`/post/${id}`, data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
};

// DELETE /posts/:id
export const deleteEntity = async (id: number): Promise<void> => {
    await api.delete(`/post/${id}`);
};
