import React, { useEffect, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { ITasksProps } from "../types/taskProps";
import { ITask } from "../types/task";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IUser } from "../types/user";
import { updateTask } from "../services/task";

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
  const { data: session } = useSession();
  const [participantss, setParticipants] = useState([
    {
      name: "Unassigned",
      email: "no_assigned_user",
      image: "https://via.placeholder.com/96", 
    },
    {
      name: "Noa Levin",
      email: "nlevin1001@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocIu2CH7xG9QqPR6ITXBLL76M6TfLiznJvVXritr6LvYDNW7c-w=s96-c",
    },
    {
      name: "Test User",
      email: "testuser@example.com",
      image: "https://via.placeholder.com/96",
    },
  ]);

  // Sortable item component
  const SortableItem = SortableElement<{ value: ITask }>(
    ({ value }: { value: ITask }) => {
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);

      const handleAssignChange = (newAssignedEmail: string) => {
        value.assignedTo = newAssignedEmail;
        setIsDropdownOpen(false);
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
                border: "solid red",
                padding: "0",
                backgroundColor: "transparent",
                cursor: "pointer",
                position: "relative",
                zIndex: 1,
              }}
              onClick={() => {
                console.log("poiu");
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <span style={{ display: "block", width: "100%", height: "100%" }}>
                <Image
                  src={session?.user.image ?? "/default-avatar.png"}
                  alt="Assigned"
                  width={100}
                  height={100}
                  style={{
                    objectFit: "cover",
                    pointerEvents: "auto",
                  }}
                />
              </span>
            </button>
            {value.assignedTo}
            {isDropdownOpen && (
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
                    onClick={() => handleAssignChange(participant.email)}
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
                    {participant.name || participant.email}
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

  // Handle drag-and-drop between columns
  const onSortEnd = ({
    oldIndex,
    newIndex,
    event,
  }: {
    oldIndex: number;
    newIndex: number;
    event: React.DragEvent;
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
      {Object.entries(tasks).map(([status, items]) => (
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
            {status === "notStarted"
              ? "Not Started"
              : status === "inProgress"
              ? "In Progress"
              : "Completed"}
          </h3>
          <SortableList
            items={items}
            onSortStart={onSortStart}
            onSortEnd={(sortEndData) => onSortEnd({ ...sortEndData, event })}
            helperClass="dragging"
            axis="y"
          />
        </div>
      ))}
    </div>
  );
};

export default Tasks;
