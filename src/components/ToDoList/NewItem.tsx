import { Plus } from "lucide-react";
import React, { useState, FormEvent } from "react";

type NewItemProps = {
    onAddTodo: (text: string) => void;
};

export const NewItem: React.FC<NewItemProps> = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState("");

    const capitalizeFirstLetter = (s: string): string => {
        return s.replace(/^[^a-zA-Z]*([a-zA-Z])/, (match) =>
            match.toUpperCase()
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const capitalizedInput = capitalizeFirstLetter(inputValue.trim());
        if (capitalizedInput) {
            onAddTodo(capitalizedInput);
            setInputValue("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center mt-2 mb-4">
            <input
                type="text"
                className="border border-slate-700 rounded-lg p-2 mr-2 flex-grow focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new task"
            />
            <button
                type="submit"
                className="border bg-slate-700 hover:bg-slate-600 rounded-lg p-2"
                disabled={!inputValue.trim()}
            >
                <Plus className="stroke-current text-white" />
            </button>
        </form>
    );
};
