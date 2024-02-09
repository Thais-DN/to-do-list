import ToDoList from "@/components/ToDoList/ToDoList";

export default function Home() {
    return (
        <div className="h-screen flex items-center justify-center bg-slate-100 border-2">
            <div>
                <h1 className="text-center text-2xl font-bold">To-Do List</h1>
                <ToDoList />
            </div>
        </div>
    );
}
