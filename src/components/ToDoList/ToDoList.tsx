"use client";
import React, { useEffect, useState } from "react";
import { NewItem } from "./NewItem";
import { ItemList } from "./ItemList";
import { TodoItemType } from "./TodoItemType";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoItemType[]>(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        const newTodo = { id: Date.now(), text, completed: false };
        setTodos([...todos, newTodo]);
    };

    const editTodo = (id: number, newText: string) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        text:
                            newText.charAt(0).toUpperCase() + newText.slice(1),
                        isEditing: false,
                    };
                }
                return todo;
            })
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="min-h-height border-2 rounded-lg border-slate-400 p-4 max-w-96 mx-auto mt-4">
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
