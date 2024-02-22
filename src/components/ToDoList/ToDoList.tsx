"use client";
import React, { useEffect, useState } from "react";
import { NewItem } from "./NewItem";
import { ItemList } from "./ItemList";
import { TodoItemType } from "./TodoItemType";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoItemType[]>([]);

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        const todosStorage = savedTodos ? JSON.parse(savedTodos) : [];
        setTodos(todosStorage);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = (text: string) => {
        const newTodo = { id: Date.now(), text, completed: false };
        todos && setTodos([...todos, newTodo]);
    };

    const editTodo = (id: number, newText: string) => {
        todos &&
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            text:
                                newText.charAt(0).toUpperCase() +
                                newText.slice(1),
                            isEditing: false,
                        };
                    }
                    return todo;
                })
            );
    };

    const deleteTodo = (id: number) => {
        todos && setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="h-todo min-h-96 border-2 rounded-lg border-slate-600 p-4 w-96 mx-auto mt-4">
            <NewItem onAddTodo={addTodo} />

            <ItemList
                todos={todos}
                setTodos={setTodos}
                onDeleteTodo={deleteTodo}
                onEditTodo={editTodo}
            />
        </div>
    );
};

export default TodoList;
