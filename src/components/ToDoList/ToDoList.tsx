// components/TodoList.tsx
"use client";
import { Plus, X, Edit2, Check } from "lucide-react";
import { useState, FormEvent } from "react";

type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
};

export default function TodoList() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [edit, setEdit] = useState<{ id: number | null; text: string }>({
        id: null,
        text: "",
    });

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const addTodo = (event: FormEvent) => {
        event.preventDefault();
        const capitalizedText = capitalizeFirstLetter(inputValue);
        const newTodo: TodoItem = {
            id: Date.now(),
            text: capitalizedText,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setInputValue("");
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodoCompletion = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const startEdit = (todo: TodoItem) => {
        setEdit({ id: todo.id, text: todo.text });
    };

    const cancelEdit = () => {
        setEdit({ id: null, text: "" });
    };

    const submitEdit = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, text: capitalizeFirstLetter(edit.text) }
                    : todo
            )
        );
        cancelEdit();
    };

    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEdit({ ...edit, text: event.target.value });
    };

    return (
        <div className="min-h-height border-2 rounded-lg border-gray-300 p-4 max-w-md mx-auto mt-4">
            <form onSubmit={addTodo} className="flex items-center">
                <input
                    type="text"
                    className="border rounded-lg p-2 mr-2 flex-grow"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task"
                />
                <button
                    type="submit"
                    className="border bg-slate-700 rounded-lg p-2"
                >
                    <Plus className="stroke-current text-white" />
                </button>
            </form>

            <div>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id} className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodoCompletion(todo.id)}
                                className="mr-2"
                            />
                            {edit.id === todo.id ? (
                                <>
                                    <input
                                        value={edit.text}
                                        onChange={handleEditChange}
                                        className="flex-grow mr-2 p-1 border rounded"
                                    />
                                    <button
                                        onClick={() => submitEdit(todo.id)}
                                        className="p-1"
                                    >
                                        <Check className="stroke-current text-green-500" />
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="p-1"
                                    >
                                        <X className="stroke-current text-red-500" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span
                                        className={`flex-grow ${
                                            todo.completed ? "line-through" : ""
                                        }`}
                                    >
                                        {todo.text}
                                    </span>
                                    <button
                                        onClick={() => startEdit(todo)}
                                        className="p-1"
                                    >
                                        <Edit2 className="stroke-current text-blue-500" />
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="p-1"
                                    >
                                        <X className="stroke-current text-red-500" />
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
