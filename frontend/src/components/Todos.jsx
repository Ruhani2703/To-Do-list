export function Todos({ todos }) {
  console.log("Todos received:", todos); // Log the todos prop

  if (!Array.isArray(todos)) {
    console.error("Todos prop is not an array:", todos);
    return <div>Error: Todos data is not available</div>;
  }

  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        todos.map((todo, index) => {
          console.log("Todo item at index", index, ":", todo); // Log each todo item

          if (!todo || typeof todo !== 'object' || !todo.title) {
            console.error("Invalid todo item at index:", index, todo);
            return <div key={index}>Error: Invalid todo item</div>;
          }

          return (
            <div key={index}>
              <h3>{todo.title || "Untitled"}</h3>
              <p>{todo.description || "No description"}</p>
              <p>{todo.completed ? "Completed" : "Not Completed"}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
