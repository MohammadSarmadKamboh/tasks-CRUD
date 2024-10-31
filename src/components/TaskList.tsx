interface Task {
  title: string;
  type: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[];
  onUpdate: (index: number) => void;
  onDelete: (index: number) => void;
  onDeleteAll: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdate,
  onDelete,
  onDeleteAll,
}) => {
  return (
    <div className="p-6">
      <h3 className="text-center p-6 text-2xl font-semibold">Tasks</h3>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks available. Please add a task.
        </p>
      ) : (
        <>
          <button
            className="mb-4 bg-red-500 text-white font-bold px-6 py-3 rounded hover:scale-110 transition-transform duration-150 active:bg-red-600"
            onClick={onDeleteAll}>
            Delete All Tasks
          </button>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {["Title", "Type", "Description", "Actions"].map((header) => (
                  <th key={header} className="py-2 px-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-2 border">{task.title}</td>
                  <td className="py-2 px-2 border">{task.type}</td>
                  <td className="py-2 px-2 border max-w-[480px] break-words ">
                    {task.description}
                  </td>
                  <td className="py-2 px-2 border flex justify-center items-center gap-2">
                    <button
                      className="text-white px-3 py-1.5 bg-blue-600 rounded hover:scale-110 transition-transform duration-150 active:bg-blue-700"
                      onClick={() => onUpdate(index)}>
                      Update
                    </button>
                    <button
                      className="text-white px-3 py-1.5 bg-red-500 rounded hover:scale-110 transition-transform duration-150 active:bg-red-600"
                      onClick={() => onDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TaskList;
