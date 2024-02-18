import ThemeToggle from "@/components/ToDoList/ThemeToggle";
import ToDoList from "@/components/ToDoList/ToDoList";

export default function Home() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 border-2">
            <div className="flex items-center justify-between space-x-4">
                <h1 className="text-center text-2xl font-bold text-slate-700 dark:text-violet-300">
                    To-Do List
                </h1>
                <ThemeToggle />
            </div>
            <div>
                <ToDoList />
            </div>
        </div>
    );
}
