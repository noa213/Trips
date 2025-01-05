import React, { useState } from "react";
import {
  SortableContainer,
  SortableElement,
  SortEnd,
  SortEvent,
} from "react-sortable-hoc";
import { ITasksProps } from "../types/taskProps";
import { ITask } from "../types/task";
import Image from "next/image";
import { updateTask } from "../services/task";
import { IUser } from "../types/user";

let sourceColumn: string | null = null;

const Tasks: React.FC<ITasksProps> = ({ tasksList, participants }) => {
  // Group tasks by status
  const groupTasksByStatus = (tasks: ITask[]) =>
    tasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {} as Record<string, ITask[]>);

  const [tasks, setTasks] = useState(groupTasksByStatus(tasksList));
  const statusOrder = ["not started", "in progress", "completed"];
  const [isDropdownOpen, setIsDropdownOpen] = useState<Record<string, boolean>>(
    {}
  );

  const [participantss] = useState([
    {
      name: "Unassigned",
      email: "",
      image: "https://via.placeholder.com/96",
    },
    ...participants,
  ]);

  // Sortable item component
  const SortableItem = SortableElement<{ value: ITask }>(
    ({ value }: { value: ITask }) => {
      const toggleDropdown = (taskId: string) => {
        setIsDropdownOpen((prev) => ({
          ...prev,
          [taskId]: !prev[taskId],
        }));
      };

      const handleAssignChange = (newAssigned: IUser) => {
        value.assignedTo = newAssigned;
        setIsDropdownOpen((prev) => ({
          ...prev,
          [value.taskId]: false,
        }));
        updateTaskInDatabase(value);
      };

      return (
        <div
          draggable="true"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #dfe1e6",
            marginBottom: "10px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease",
          }}
        >
          <p
            style={{
              fontWeight: "600",
              fontSize: "14px",
              color: "#172b4d",
              marginBottom: "5px",
            }}
          >
            {value.title}
          </p>
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <button
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                overflow: "hidden",
                marginRight: "8px",
                border: "solid",
                padding: "0",
                backgroundColor: "transparent",
                cursor: "pointer",
                position: "relative",
                zIndex: 1,
              }}
              onClick={() => {
                console.log("poiu");
                toggleDropdown(value.taskId);
              }}
            >
              <span style={{ display: "block", width: "100%", height: "100%" }}>
                <Image
                  src={
                    value.assignedTo?.image ?? "https://via.placeholder.com/96"
                  }
                  alt="Assigned"
                  width={100}
                  height={100}
                  style={{
                    objectFit: "cover",
                    pointerEvents: "none",
                  }}
                />
              </span>
            </button>
            {/* {value.assignedTo?.name} */}
            {isDropdownOpen[value.taskId] && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "0",
                  backgroundColor: "#ffffff",
                  border: "1px solid #dfe1e6",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                }}
              >
                {participantss.map((participant) => (
                  <button
                    key={participant.email}
                    onClick={() => handleAssignChange(participant)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      width: "200px",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <Image
                      src={participant.image || "/default-avatar.png"}
                      alt={participant.name || "User"}
                      width={24}
                      height={24}
                      style={{
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                    {participant.name} <br /> {participant.email}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p style={{ fontSize: "12px", color: "#5e6c84" }}>
            Due: {value.dueDate}
          </p>
        </div>
      );
    }
  );

  // Sortable list component
  const SortableList = SortableContainer<{ items: ITask[] }>(
    ({ items }: { items: ITask[] }) => (
      <div
        style={{
          width: "100px",
          padding: "10px",
          margin: "10px",
          borderRadius: "8px",
          minHeight: "200px",
        }}
      >
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </div>
    )
  );

  // Track source column
  const onSortStart = ({ node }: { node: Element }) => {
    const columnElement = node.closest(".column");
    sourceColumn = columnElement?.getAttribute("data-column-id") || null;
  };

  const onSortEndHandler = (sortEndData: SortEnd, event: SortEvent) => {
    const nativeEvent = event as unknown as MouseEvent;
    onSortEnd({ ...sortEndData, event: nativeEvent });
  };

  // Handle drag-and-drop between columns
  const onSortEnd = ({
    oldIndex,
    newIndex,
    event,
  }: {
    oldIndex: number;
    newIndex: number;
    event: MouseEvent;
  }) => {
    const hoveredElement = document.elementFromPoint(
      event.clientX,
      event.clientY
    );
    const closestColumn = hoveredElement?.closest(".column[data-column-id]");
    const targetColumnId = closestColumn?.getAttribute("data-column-id");

    if (
      !sourceColumn ||
      !targetColumnId ||
      !tasks[sourceColumn] ||
      !tasks[targetColumnId]
    ) {
      console.error("Invalid source or target column.");
      return;
    }
    const updatedTasks = { ...tasks };
    const [movedTask] = updatedTasks[sourceColumn].splice(oldIndex, 1);
    updatedTasks[targetColumnId].splice(newIndex, 0, movedTask);
    sourceColumn = null;
    updateTaskInDatabase(movedTask);
    setTasks(updatedTasks);
  };

  const updateTaskInDatabase = async (task: ITask) => {
    try {
      console.log("taskkkk", task);

      await updateTask(task);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      className="columns-container"
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f4f5f7",
        borderRadius: "8px",
      }}
    >
      {statusOrder.map(
        (status) =>
          tasks[status] && (
            <div
              className="column"
              data-column-id={status}
              key={status}
              style={{
                width: "280px", // עמודה רחבה יותר
                padding: "15px",
                border: "1px solid #dfe1e6",
                borderRadius: "8px",
                minHeight: "400px",
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#172b4d",
                  marginBottom: "10px",
                }}
              >
                {status === "not started"
                  ? "Not Started"
                  : status === "in progress"
                  ? "In Progress"
                  : "Completed"}
              </h3>
              <SortableList
                items={tasks[status]}
                onSortStart={onSortStart}
                onSortEnd={(sortEndData, event) =>
                  onSortEndHandler(sortEndData, event)
                }
                axis="y"
              />
            </div>
          )
      )}
    </div>
  );
};

export default Tasks;
