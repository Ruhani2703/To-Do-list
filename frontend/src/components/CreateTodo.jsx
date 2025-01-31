import { useState } from "react";

export function CreateTodo({ setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const addTodo = async () => {
    try {
      const res = await fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await res.json();
      alert("Todo added");

      // Assuming backend returns the new todo item
      setTodos((prevTodos) => [...prevTodos, json.todo]);
      
      // Clear input fields
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div>
      <input
        id="title"
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      /><br/>
      <input
        id="desc"
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      /><br/>
      <button
        style={{ padding: 10, margin: 10 }}
        onClick={addTodo}
      >
        Add a Todo
      </button>
    </div>
  );
}
