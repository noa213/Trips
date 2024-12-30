import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { ITasksProps } from "../types/taskProps";
import { ITask } from "../types/task";

let sourceColumn: string | null = null;

const Tasks: React.FC<ITasksProps> = ({ tasksList }) => {
  // Group tasks by status
  const groupTasksByStatus = (tasks: ITask[]) =>
    tasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {} as Record<string, ITask[]>);
  const [tasks, setTasks] = useState(groupTasksByStatus(tasksList));

  // Sortable item component
  const SortableItem = SortableElement<{ value: ITask }>(
    ({ value }: { value: ITask }) => (
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
        <p style={{ fontSize: "12px", color: "#5e6c84" }}>
          Assigned to: {value.assignedTo}
        </p>
        <p style={{ fontSize: "12px", color: "#5e6c84" }}>
          Due: {value.dueDate}
        </p>
      </div>
    )
  );

  // Sortable list component
  const SortableList = SortableContainer<{
    items: ITask[];
  }>(({ items }: { items: ITask[]}) => (
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
  ));

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
    const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
    const closestColumn = hoveredElement?.closest(".column[data-column-id]");
    const targetColumnId = closestColumn?.getAttribute("data-column-id");

    if (!sourceColumn || !targetColumnId || !tasks[sourceColumn] || !tasks[targetColumnId]) {
      console.error("Invalid source or target column.");
      return;
    }
    const updatedTasks = { ...tasks };
    const [movedTask] = updatedTasks[sourceColumn].splice(oldIndex, 1);
    updatedTasks[targetColumnId].splice(newIndex, 0, movedTask);
    sourceColumn = null;
    setTasks(updatedTasks);
  };

  return (
    <div
  className="columns-container"
  style={{
    display: "flex",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f4f5f7", // צבע רקע כללי עדין
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
        border: "1px solid #dfe1e6", // מסגרת עדינה
        borderRadius: "8px",
        minHeight: "400px", // גובה מינימלי לעמודות
        backgroundColor: "#ffffff", // רקע לבן לעמודות
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)", // צל רך
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#172b4d", // צבע טקסט כהה
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

    // <div className="columns-container" style={{ display: "flex", gap: "20px" }}>
    //   {Object.entries(tasks).map(([status, items]) => (
    //     <div
    //       className="column"
    //       data-column-id={status}
    //       key={status}
    //       style={{
    //         width: "200px",
    //         padding: "10px",
    //         border: "1px solid grey",
    //         borderRadius: "8px",
    //         minHeight: "200px",
    //         backgroundColor: "#f9f9f9",
    //       }}
    //     >
    //       <SortableList
    //         items={items}
    //         columnId={status}
    //         onSortStart={onSortStart}
    //         onSortEnd={(sortEndData) => onSortEnd({ ...sortEndData, event })}
    //         helperClass="dragging"
    //         axis="y"
    //       />
    //     </div>
    //   ))}
    // </div>
  );
};

export default Tasks;
