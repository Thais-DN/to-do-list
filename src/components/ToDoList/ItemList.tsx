import React, { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { TodoItemType } from "./TodoItemType";
import confetti from "canvas-confetti";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Toaster, toast } from "sonner";

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
    const [parent] = useAutoAnimate();
    const [currentlyEditingId, setCurrentlyEditingId] = useState<number | null>(
        null
    );

    const handleEditClick = (todo: TodoItemType) => {
        setCurrentlyEditingId(todo.id);
        setEditingText(todo.text);
    };

    const handleSaveClick = (id: number) => {
        onEditTodo(id, editingText);
        setCurrentlyEditingId(null);
        setEditingText(""); // Limpar o texto de edição após salvar
    };
    const handleKeyDown = (event: React.KeyboardEvent, id: number) => {
        if (event.key === "Enter") {
            handleSaveClick(id);
        }
    };

    const ToggleComplete = (id: number) => {
        const todo = todos.find((todo) => todo.id === id);
        if (todo && !todo.completed) {
            confetti({
                angle: 90,
                spread: 90,
                particleCount: 500,
                origin: { y: 0.6 },
            });
            console.log("estou aqui");
        }

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
        <ScrollArea.Root className="overflow-auto ">
            <ScrollArea.Viewport className="max-h-scroll">
                <div ref={parent}>
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="flex justify-between w-item group p-1 mb-4 border rounded-lg text-slate-800 bg-slate-300/40 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 dark:border-violet-300 dark:text-slate-200"
                        >
                            <div className="flex items-start item ">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => ToggleComplete(todo.id)}
                                    className="appearance-none h-0 w-0 opacity-0 "
                                />
                                <div
                                    className={`min-h-5 min-w-5 mt-1.5 mx-2 flex items-start justify-center border-2 rounded cursor-pointer ${
                                        todo.completed
                                            ? "bg-slate-400 border-slate-500 dark:border-violet-400 dark:bg-slate-600"
                                            : "border-slate-500 dark:border-violet-400"
                                    }`}
                                    onClick={() => ToggleComplete(todo.id)}
                                >
                                    {todo.completed && (
                                        <svg
                                            className="w-4 h-4 text-slate-200 dark:text-violet-400"
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
                                {currentlyEditingId === todo.id ? (
                                    <input
                                        type="text"
                                        value={editingText}
                                        onChange={(e) =>
                                            setEditingText(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, todo.id)
                                        }
                                        className="p-1 border rounded bg-slate-200/5 group-hover:bg-slate-300 dark:group-hover:bg-slate-600 focus:outline-none"
                                    />
                                ) : (
                                    <p
                                        className={`${
                                            todo.completed && "line-through"
                                        } mt-1`}
                                    >
                                        {todo.text}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-start">
                                {currentlyEditingId === todo.id ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleSaveClick(todo.id)
                                            }
                                            className="p-1"
                                        >
                                            <Check className="stroke-current size-7 text-green-700 dark:text-violet-300 dark:hover:text-green-400" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex">
                                        <button
                                            onClick={() =>
                                                handleEditClick(todo)
                                            }
                                            className="p-1"
                                        >
                                            <Pencil className="stroke-current  text-sky-800 hover:text-sky-950 dark:text-violet-300 dark:hover:text-sky-400" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                onDeleteTodo(todo.id)
                                            }
                                            className="p-1"
                                        >
                                            <Trash2 className="stroke-current text-red-800 hover:text-red-950 dark:text-violet-300 dark:hover:text-red-400" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>

            <ScrollArea.Scrollbar orientation="horizontal">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>

            <ScrollArea.Corner />
        </ScrollArea.Root>
    );
};
