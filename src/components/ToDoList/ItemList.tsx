import React, { useState } from "react";
import { X, Edit3, Check, Pencil, Trash2 } from "lucide-react";
import { TodoItemType } from "./TodoItemType";

type ItemListProps = {
    todos: TodoItemType[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
    onDeleteTodo: (id: number) => void;
    onEditTodo: (id: number, newText: string) => void;
};

export const ItemList: React.FC<ItemListProps> = ({
    todos,
    setTodos,
    onDeleteTodo,
    onEditTodo,
}) => {
    const [editingText, setEditingText] = useState("");

    const ToggleComplete = (id: number) => {
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
        <div>
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className="flex justify-between group items-center p-1 my-4 border rounded-lg bg-slate-300/40 hover:bg-slate-300"
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => ToggleComplete(todo.id)}
                            className="appearance-none h-0 w-0 opacity-0"
                        />
                        <div
                            className={`size-5 mr-2 flex items-center justify-center border-2 rounded  ${
                                todo.completed
                                    ? "bg-slate-500 border-slate-900"
                                    : "border-slate-500"
                            }`}
                            onClick={() => ToggleComplete(todo.id)}
                        >
                            {todo.completed && (
                                <svg
                                    className="w-4 h-4 text-slate-200"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        {todo.isEditing ? (
                            <input
                                type="text"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                className="p-1 border rounded bg-slate-200/40 group-hover:bg-slate-300"
                            />
                        ) : (
                            <span
                                className={todo.completed ? "line-through" : ""}
                            >
                                {todo.text}
                            </span>
                        )}
                    </div>

                    <div>
                        {todo.isEditing ? (
                            <>
                                <button
                                    onClick={() =>
                                        onEditTodo(todo.id, editingText)
                                    }
                                    className="p-1"
                                >
                                    <Check className="stroke-current size-7 text-green-700" />
                                </button>
                            </>
                        ) : (
                            <div className="flex">
                                <button
                                    onClick={() => {
                                        setEditingText(todo.text);
                                        todo.isEditing = true;
                                    }}
                                    className="p-1"
                                >
                                    <Pencil className="stroke-current  text-sky-800" />
                                </button>
                                <button
                                    onClick={() => onDeleteTodo(todo.id)}
                                    className="p-1"
                                >
                                    <Trash2 className="stroke-current text-red-800" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
