// import mongoose, { Model, Schema } from "mongoose";
// import { ITrip } from "@/app/types/trip";

// const trips: Schema<ITrip> = new Schema({
//   title: { type: String, required: true },
//   destination: { type: String, required: true },
//   dates: {
//     start: { type: Date, required: true },
//     end: { type: Date, required: true },
//   },
//   budget: {
//     total: { type: Number, required: true },
//     spent: { type: Number, required: true },
//     categories: {
//       transportation: { type: Number, required: true },
//       accommodation: { type: Number, required: true },
//       food: { type: Number, required: true },
//       activities: { type: Number, required: true },
//     },
//     participants: [
//       {
//         userId: { type: String, required: true },
//         share: { type: Number, required: true },
//       },
//     ],
//   },
//   tasks: [
//     {
//       taskId: { type: String, required: true },
//       title: { type: String, required: true },
//       assignedTo: { type: String, required: true },
//       status: {
//         type: String,
//         enum: ["notStarted", "inProgress", "completed"],
//         required: true,
//       },
//       dueDate: { type: Date, required: true },
//     },
//   ],
//   polls: [
//     {
//       pollId: { type: String, required: true },
//       question: { type: String, required: true },
//       options: [
//         {
//           option: { type: String, required: true },
//           votes: { type: Number, required: true },
//         },
//       ],
//       status: { type: String, enum: ["open", "closed"], required: true },
//     },
//   ],
//   memories: [
//     {
//       imageUrl: { type: String, required: true },
//       description: { type: String, required: true },
//       userId: { type: String, required: true },
//       timestamp: { type: Date, required: true },
//     },
//   ],
//   status: {
//     type: String,
//     enum: ["active", "completed", "cancelled"],
//     required: true,
//   },
// });

// const Trip: Model<ITrip> =
//   mongoose.models.Trip || mongoose.model<ITrip>("Trip", trips);

// export default Trip;

import mongoose, { Model, Schema } from "mongoose";
import { ITrip } from "@/app/types/trip";

const trips: Schema<ITrip> = new Schema({
  title: { type: String },
  destination: { type: String },
  dates: {
    start: { type: Date },
    end: { type: Date },
  },
  budget: {
    total: { type: Number },
    tripType: {
      type: String,
      enum: ["urban", "nature", "family"],
    },

    // spent: { type: Number },
    categories: {
      transportation: { type: Number },
      accommodation: { type: Number },
      food: { type: Number },
      activities: { type: Number },
    },
  },
  participants: [
    {
      userId: { type: String },
      share: { type: Number },
    },
  ],

  tasks: [
    {
      taskId: { type: String },
      title: { type: String },
      assignedTo: { type: String },
      status: {
        type: String,
        enum: ["notStarted", "inProgress", "completed"],
        required: true,
      },
      dueDate: { type: Date },
    },
  ],
  polls: [
    {
      pollId: { type: String },
      question: { type: String },
      options: [
        {
          option: { type: String },
          votes: { type: Number },
        },
      ],
      status: { type: String, enum: ["open", "closed"] },
    },
  ],
  memories: [
    {
      imageUrl: { type: String },
      description: { type: String },
      userId: { type: String },
      timestamp: { type: Date },
    },
  ],
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    required: true,
  },
});

const Trip: Model<ITrip> =
  mongoose.models.Trip || mongoose.model<ITrip>("Trip", trips);

export default Trip;
