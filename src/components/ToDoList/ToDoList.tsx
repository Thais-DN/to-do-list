// components/TodoList.tsx
"use client";
import { Plus } from "lucide-react";
import { useState, FormEvent } from "react";

type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
};

export default function TodoList() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [inputValue, setInputValue] = useState("");

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const addTodo = (event: FormEvent) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        const capitalizedText = capitalizeFirstLetter(inputValue);
        const newTodo: TodoItem = {
            id: Date.now(),
            text: capitalizedText,
            completed: false, // Inicializado como false
        };
        setTodos([...todos, newTodo]);
        setInputValue("");
    };

    const toggleTodoCompletion = (id: number) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        );
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
                    <Plus className="size-6 stroke-current text-white" />
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
                            <span
                                className={todo.completed ? "line-through" : ""}
                            >
                                {todo.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
