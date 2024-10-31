import { useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import TaskList from "./TaskList";

interface FormData {
  title: string;
  type: string;
  description: string;
}

const fields = [
  {
    name: "title",
    label: "Task Title",
    type: "text",
    rules: {
      required: "Task title is required.",
      minLength: {
        value: 3,
        message: "Minimum 3 characters required.",
      },
      maxLength: {
        value: 25,
        message: "Maximum 25 characters allowed.",
      },
    },
  },
  {
    name: "type",
    label: "Task Type",
    type: "text",
    rules: {
      required: "Task type is required.",
      minLength: {
        value: 3,
        message: "Minimum 3 characters required.",
      },
      maxLength: {
        value: 10,
        message: "Maximum 10 characters allowed.",
      },
    },
  },
  {
    name: "description",
    label: "Task Description",
    type: "text",
    rules: {
      required: "Task description is required.",
      minLength: {
        value: 3,
        message: "Minimum 3 characters required.",
      },
      maxLength: {
        value: 150,
        message: "Maximum 150 characters allowed.",
      },
    },
  },
];

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<FormData[]>([]);
  const [updateIndex, setUpdateIndex] = useState<number | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newTask = { ...data };

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      if (updateIndex !== null) {
        updatedTasks[updateIndex] = newTask;
        setUpdateIndex(null);
        setIsUpdateMode(false);
        setShowModal(false);
      } else {
        updatedTasks.unshift(newTask);
        setShowModal(false);
      }
      return updatedTasks;
    });

    reset();
  };

  const handleUpdate = (index: number) => {
    setUpdateIndex(index);
    const taskToUpdate = tasks[index];
    setValue("title", taskToUpdate.title);
    setValue("type", taskToUpdate.type);
    setValue("description", taskToUpdate.description);
    setIsUpdateMode(true);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    const confirmDelete = window.confirm("Do you want to delete all tasks?");
    if (confirmDelete) {
      setTasks([]);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-12">
        <button
          className="w-[90%] bg-blue-600 text-white font-bold px-6 py-3 rounded hover:scale-105 transition-transform duration-150 active:bg-blue-700"
          type="button"
          onClick={() => setShowModal(true)}>
          Add New Task
        </button>
      </div>

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b-2 border-solid">
                  <h3 className="text-3xl font-semibold">
                    {isUpdateMode ? "Update Task" : "Add Task"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-red-500 rounded float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      reset();
                      setShowModal(false);
                    }}>
                    <span className="text-white size-7 block text-xl scale-110">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative p-6 flex-auto">
                    {fields.map((field, index) => (
                      <div key={index} className="mb-[10px]">
                        <label className="p-2">{field.label}</label>
                        <input
                          {...register(field.name as keyof FormData, {
                            ...field.rules,
                          })}
                          placeholder={field.label}
                          type={field.type}
                          className="p-2 hover:bg-gray-50 border border-gray-300 rounded"
                        />
                        {errors[field.name as keyof FormData] && (
                          <p className="p-2 text-red-500">
                            {
                              (
                                errors[
                                  field.name as keyof FormData
                                ] as FieldError
                              ).message
                            }
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end gap-3 p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 px-6 py-3 rounded hover:scale-110 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        reset();
                      }}>
                      Clear
                    </button>
                    <button
                      type="submit"
                      className={`${
                        isUpdateMode
                          ? "text-white px-6 py-3 bg-blue-600 active:bg-blue-700 rounded hover:scale-110 ease-linear transition-all duration-150 "
                          : "text-white px-6 py-3 bg-emerald-500 active:bg-emerald-600  rounded hover:scale-110  ease-linear transition-all duration-150"
                      }`}>
                      {isUpdateMode ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onDeleteAll={handleDeleteAll}
      />
    </>
  );
};

export default Modal;
