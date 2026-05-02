import axios from "axios";

const BASE = "http://localhost:8080/api/lessons";

// GET
export const getLessons = async () => {
    const res = await axios.get(BASE);
    return res.data;
};

// POST
export const addLesson = async (lesson) => {
    const res = await axios.post(BASE, lesson);
    return res.data;
};

// DELETE
export const deleteLesson = async (id) => {
    await axios.delete(`${BASE}/${id}`);
};