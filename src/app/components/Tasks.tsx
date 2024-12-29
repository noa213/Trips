import React, { useState } from "react";
import {
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";

type Task = string;

type TaskColumn = {
  [key: string]: Task[];
};

const SortableItem = SortableElement<{ value: Task }>(
  ({ value }: { value: Task }) => (
    <div
      draggable="true"
      style={{
        width: "70px",
        padding: "10px",
        border: "1px solid black",
        margin: "5px",
        backgroundColor: "#f0f0f0",
      }}
    >
      {value}
    </div>
  )
);

const SortableList = SortableContainer<{
  items: Task[];
  columnId: string;
}>(({ items, columnId }: { items: Task[]; columnId: string }) => (
  <div
    style={{
      width: "100px",
      padding: "10px",
      backgroundColor: "#e0e0e0",
      margin: "10px",
      borderRadius: "8px",
      minHeight: "200px",
    }}
  >
    <h3>{columnId}</h3>
    {items.map((value, index) => (
      <SortableItem key={index} index={index} value={value} />
    ))}
  </div>
));

let sourceColumn: string | null = null;

const App: React.FC = () => {
  // const [tasks, setTasks] = useState<TaskColumn>({
  //   todo: ["Task 1", "Task 2"],
  //   inProgress: ["Task 3"],
  //   done: ["Task 4"],
  // });

  const [tasks, setTasks] = useState<TaskColumn>({
    "0": ["Task 1", "Task 2"],
    "1": ["Task 3", "Task 5"],
    "2": ["Task 4", "Task 6"],
  });

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // חשוב מאוד
    console.log("Drag over:", event.target);
    const hoveredElement = document.elementFromPoint(
      event.clientX,
      event.clientY
    ); // האלמנט שמתחת לעכבר
    const closestColumn = hoveredElement?.closest(
      ".column[data-collection-id]"
    );
    console.log("hoveredElement", hoveredElement);
    console.log("closestColumn", closestColumn);

    if (closestColumn) {
      console.log("Hovered column:", closestColumn);
    } else {
      console.log("No hovered column found");
    }
  };

  const onSortStart = ({ node }: { node: Element }) => {
    const columnElement = node.closest(".column");
    if (!columnElement) {
      console.error("Failed to identify the source column.");
      return;
    }
    sourceColumn = columnElement.getAttribute("data-column-id");
  };

  const onSortEnd = ({
    oldIndex,
    newIndex,
    event,
  }: {
    oldIndex: number;
    newIndex: number;
    event: React.DragEvent;
  }) => {
    event.preventDefault();
    const hoveredElement = document.elementFromPoint(
      event.clientX,
      event.clientY
    );
    const closestColumn = hoveredElement?.closest(
      ".column[data-collection-id]"
    );
    const targetColumnId = closestColumn!.getAttribute("data-collection-id");

    if (closestColumn) {
      console.log("Hovered column:", closestColumn);
    } else {
      console.log("No hovered column found");
    }

    if (!sourceColumn) {
      console.error("Failed to determine source or target column.");
      return;
    }
    if (!targetColumnId) {
      console.error("Failed to get the column ID of the closest element.");
      return;
    }

    const updatedTasks = { ...tasks };

    if (!updatedTasks[sourceColumn]) {
      console.error(`Source column '${sourceColumn}' does not exist in tasks.`);
      return;
    }

    if (!updatedTasks[targetColumnId]) {
      console.error(
        `Target column '${targetColumnId}' does not exist in tasks.`
      );
      return;
    }
    const [movedTask] = updatedTasks[sourceColumn].splice(oldIndex, 1);
    updatedTasks[targetColumnId].splice(newIndex, 0, movedTask);
    sourceColumn = null;
    setTasks(updatedTasks);
  };

  return (
    <div
      className="columns-container"
      onDragOver={(event) => {
        onDragOver(event);
      }}
      style={{ display: "flex", gap: "20px" }}
    >
      {Object.entries(tasks).map(([columnId, items], index) => (
        <div
          className="column"
          data-column-id={columnId}
          data-collection-id={index}
          key={columnId}
          style={{
            width: "200px",
            padding: "10px",
            border: "1px solid grey",
            borderRadius: "8px",
            minHeight: "200px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <SortableList
            items={items}
            columnId={columnId}
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

export default App;
