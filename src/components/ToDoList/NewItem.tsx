// components/NewItem.tsx
import { Plus } from "lucide-react";
import React, { useState, FormEvent } from "react";

type NewItemProps = {
    onAddTodo: (text: string) => void;
};

export const NewItem: React.FC<NewItemProps> = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onAddTodo(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
        setInputValue("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <input
                type="text"
                className="border border-slate-700 rounded-lg p-2 mr-2 flex-grow"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new task"
            />
            <button
                type="submit"
                className="border bg-slate-700 hover:bg-slate-600 rounded-lg p-2"
            >
                <Plus className="stroke-current text-white" />
            </button>
        </form>
    );
};
