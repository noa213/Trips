import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

type Task = string;

type TaskColumn = {
  [key: string]: Task[];
};

const SortableItem = SortableElement<{ value: Task }>(
  ({ value }: { value: Task }) => (
    <div
      style={{
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
  onSortEnd: any;
}>(({ items, columnId }: { items: Task[]; columnId: string }) => (
  <div
    style={{
      width: "250px",
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

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskColumn>({
    todo: ["Task 1", "Task 2"],
    inProgress: ["Task 3"],
    done: ["Task 4"],
  });

  const onSortEnd = ({
    oldIndex,
    newIndex,
    collection,
  }: {
    oldIndex: number;
    newIndex: number;
    collection: string;
  }) => {
    const [oldColumnId, newColumnId] = collection.split(":"); // מזהים את העמודה הישנה והעמודה החדשה
    const updatedTasks = { ...tasks };

    if (oldColumnId === newColumnId) {
      // אם המשימה נשארת באותה עמודה
      const movedItem = updatedTasks[oldColumnId].splice(oldIndex, 1)[0];
      updatedTasks[oldColumnId].splice(newIndex, 0, movedItem);
    } else {
      // אם המשימה עברה לעמודה אחרת
      const movedItem = updatedTasks[oldColumnId].splice(oldIndex, 1)[0];
      updatedTasks[newColumnId].splice(newIndex, 0, movedItem);
    }

    setTasks(updatedTasks);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {Object.keys(tasks).map((columnId) => (
        <SortableList
          key={columnId}
          columnId={columnId}
          items={tasks[columnId]}
          onSortEnd={({ oldIndex, newIndex, collection }) =>
            onSortEnd({
              oldIndex,
              newIndex,
              collection: `${collection}:${columnId}`, // שומרים מידע על העמודה
            })
          }
          helperClass="dragging"
        />
      ))}
    </div>
  );
};

export default App;
