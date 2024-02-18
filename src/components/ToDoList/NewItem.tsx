import { Plus } from "lucide-react";
import React, { useState } from "react";

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
                className="border text-slate-800 bg-slate-300/40 hover:bg-slate-300 dark:bg-slate-700 dark:placeholder:text-slate-400 dark:text-slate-300 dark:border-violet-400 rounded-lg p-2 mr-2 flex-grow focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new task"
            />
            <button
                type="submit"
                className="border bg-slate-300/40 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 dark:border-violet-400 rounded-lg p-2"
                disabled={!inputValue.trim()}
            >
                <Plus className="stroke-current text-slate-800 dark:text-violet-400" />
            </button>
        </form>
    );
};
