import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
// import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

// const EditableField = ({
//   label,
//   value,
//   field,
//   onSave,
// }: {
//   label: string;
//   value: string;
//   field: string;
//   onSave: (field: string, value: string) => void;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [updatedValue, setUpdatedValue] = useState(value);

//   const handleSave = () => {
//     onSave(field, updatedValue);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setUpdatedValue(value); // מחזיר לערך המקורי
//   };

//   return (
//     <div
//       className="flex items-center justify-between mb-4 relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <span className="text-gray-600 font-bold">{label}:</span>
//       {isEditing ? (
//         <div className="flex items-center space-x-2">
//           <input
//             className="border p-2 rounded"
//             type="text"
//             value={updatedValue}
//             onChange={(e) => setUpdatedValue(e.target.value)}
//           />
//           <button
//             onClick={handleSave}
//             className="px-3 py-2 bg-green-500 text-white rounded flex items-center"
//           >
//             <AiOutlineCheck className="mr-1" />
//             Save
//           </button>
//           <button
//             onClick={handleCancel}
//             className="px-3 py-2 bg-red-500 text-white rounded flex items-center"
//           >
//             <AiOutlineClose className="mr-1" />
//             Cancel
//           </button>
//         </div>
//       ) : (
//         <div className="flex items-center">
//           <span>{value}</span>
//           {isHovered && (
//             <MdModeEdit
//               onClick={() => setIsEditing(true)}
//               className="cursor-pointer text-blue-500 ml-2"
//               title="Edit"
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditableField;


const EditableField = ({
    label,
    value,
    field,
    onSave,
    inputType = "text", // ברירת מחדל ל-text
  }: {
    label: string;
    value: string;
    field: string;
    onSave: (field: string, value: string) => void;
    inputType?: string; 
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [updatedValue, setUpdatedValue] = useState(value);
  
    const handleSave = () => {
      onSave(field, updatedValue);
      setIsEditing(false);
    };
  
    const handleCancel = () => {
      setUpdatedValue(value);
      setIsEditing(false);
    };
  
    return (
      <div
        className="flex items-center justify-between relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-gray-600 font-bold">{label}:</span>
        {isEditing ? (
          <>
            <input
              className="border p-2 rounded w-full"
              type={inputType}
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
            <button onClick={handleSave} className="ml-2 px-3 py-2 bg-green-500 text-white rounded">
              ✔
            </button>
            <button onClick={handleCancel} className="ml-2 px-3 py-2 bg-red-500 text-white rounded">
              ✖
            </button>
          </>
        ) : (
          <>
            <span>{value}</span>
            {isHovered && (
              <MdModeEdit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer text-blue-500 ml-2"
                title="Edit"
              />
            )}
          </>
        )}
      </div>
    );
  };
  
  export default EditableField;
