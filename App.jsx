import { useEffect, useState } from "react";
import { getLessons, addLesson, deleteLesson } from "./script";

function App() {
    const [lessons, setLessons] = useState([]);
    const [name, setName] = useState("");
    const [marks, setMarks] = useState("");

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const data = await getLessons();
        setLessons(data);
    };

    const handleAdd = async () => {
        await addLesson({ name, marks: parseInt(marks) });
        load();
    };

    const handleDelete = async (id) => {
        await deleteLesson(id);
        load();
    };

    return (
        <div>
            <h1>Sustainable Lessons</h1>

            <input placeholder="Name" onChange={e => setName(e.target.value)} />
            <input placeholder="Marks" onChange={e => setMarks(e.target.value)} />
            <button onClick={handleAdd}>Add</button>

            {lessons.map(l => (
                <div key={l.id}>
                    {l.name} - {l.marks}
                    <button onClick={() => handleDelete(l.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default App;