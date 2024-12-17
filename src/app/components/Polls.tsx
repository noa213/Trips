// "use client";
// import React, { useEffect, useState } from "react";
// import { IOption, IPoll } from "../types/poll";
// import { getPolls } from "../services/polls";
// import * as SurveyCore from "survey-core";
// import { Survey } from "survey-react-ui";
// import "survey-core/defaultV2.css";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Polls = () => {
//   const [polls, setPolls] = useState<IPoll[]>([]);
//   const [poll, setPoll] = useState<IPoll>(polls[0]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getPolls();
//         setPolls(response);
//       } catch (error) {
//         console.error("Failed to fetch polls:", error);
//       }
//     };
//     fetchData();
//   }, [setPolls]);
//   console.log(polls.map((poll) => poll.options));

//   const surveyJson = {
//     questions: polls.map((poll) => ({
//       type: "radiogroup",
//       name: poll.pollId,
//       title: poll.question,
//       choices: poll.options.map((option) => option.value),
//     })),
//   };

//   const voteOption = (pollId: string, optionIndex: number) => {
//     setPoll((prevPoll) => ({
//       ...prevPoll,
//       options: prevPoll.options.map((option: IOption, index: number) =>{
//        return index === optionIndex
//           ? { ...option, votes: option.votes + 1 }
//           : option
//     })}));
//     // setPoll(updatedPoll);
//   };

//   const renderChart = (options: IOption[]) => {
//     const data = {
//       labels: options.map((option) => option.value),
//       datasets: [
//         {
//           label: "Votes",
//           data: options.map((option) => option.votes),
//           backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//         },
//       ],
//     };
//     return data;
//   };

//   return (
//     //     <div>
//     //       <Survey
//     //         model={new SurveyCore.Model(surveyJson)}
//     //         onComplete={(sender) => {
//     //           const results = sender.data;
//     //           // Add logic here to display results after voting
//     //           console.log("Survey Completed. Results:", results);
//     //         }}
//     //       />
//     // <ResponsiveContainer width="100%" height={300}>
//     //       <PieChart>
//     //         <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
//     //           {chartData.map((entry, index) => (
//     //             <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
//     //           ))}
//     //         </Pie>
//     //       </PieChart>
//     //     </ResponsiveContainer>    </div>

//     <div>
//       {/* רכיב הסקר */}
//       <Survey
//         model={new SurveyCore.Model(surveyJson)}
//         onComplete={(sender) => {
//           const results = sender.data;
//           console.log("Survey Completed. Results:", results);
//         }}
//       />

//       {/* הצגת תרשימים לצד שאלות */}
//       {polls.map((poll) => {
//         const chartData = poll.options.map((option) => ({
//           name: option.value,
//           value: option.votes || 0,
//         }));
//         <div className="mt-4"><Bar data={renderChart(poll.options)} /></div>;

//         console.log("Chart Data for Poll:", poll.question, chartData);
//         return (
//           // eslint-disable-next-line react/jsx-key
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={chartData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={100}
//               >
//                 {chartData.map((_entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={`#${Math.floor(Math.random() * 16777215).toString(
//                       16
//                     )}`}
//                   />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         );
//       })}

//       {/* {polls.map((poll) => {
//         const chartData = poll.options.map((option) => ({
//           name: option.value,
//           value: option.votes || 0, // ברירת מחדל לערך
//         }));

//         return (
//           <div key={poll.pollId} style={{ marginTop: "20px" }}>
//             <h3>{poll.question}</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={100}
//                 >
//                   {chartData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={`#${Math.floor(Math.random() * 16777215).toString(
//                         16
//                       )}`} // צבע אקראי
//                     />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         );
//       })} */}
//     </div>

//     // <List>
//     //   {polls ? (
//     //     polls.map((poll: IPoll) => (
//     //       <ListItem key={poll.pollId} sx={{ borderBottom: "1px solid #ccc" }}>
//     //         <ListItemText
//     //           primary={poll.question}
//     //           secondary={poll.options.map((option) => option.value).join(" | ")}
//     //         />
//     //         <ListItemSecondaryAction></ListItemSecondaryAction>
//     //       </ListItem>
//     //     ))
//     //   ) : (
//     //     <p>No polls available for you.</p>
//     //   )}
//     // </List>
//   );
// };

// export default Polls;

"use client";
import React, { useEffect, useState } from "react";
import { IPoll } from "../types/poll";
import { getPolls } from "../services/polls";
// import { Survey } from "survey-react-ui";
// import * as SurveyCore from "survey-core";
import "survey-core/defaultV2.css";
// import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PieChart from "./PieChart";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Polls = () => {
  const [polls, setPolls] = useState<IPoll[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPolls();
        setPolls(response);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
      }
    };
    fetchData();
  }, []);

  // const renderChart = (options: IOption[]) => ({
  //   labels: options.map((option) => option.value),
  //   datasets: [
  //     {
  //       label: "Votes",
  //       data: options.map((option) => option.votes || 0),
  //       backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
  //     },
  //   ],
  // });
  {
    const opp = [
      { value: "111", votes: 0, _id: "675fdb35099d5d090fc55e92" },
      { value: "222", votes: 0, _id: "675fdb35099d5d090fc55e93" },
    ];
    // polls.map((poll) => {
    //   console.log(poll.options)
    // });

    polls.map((poll) => {
      return <PieChart options={poll.options} />;
    });

    return (
      <>
        {/* <PieChart options={opp} />; */}
        {polls.map((poll) => {
          console.log(poll.options); // מדפיס את האפשרויות למסך
          return <PieChart key={poll.pollId} options={poll.options} />; // מחזיר את הקומפוננטה
        })}{" "}
      </>
      // <div>
      //   {/* <Survey
      //     model={
      //       new SurveyCore.Model({
      //         questions: polls.map((poll) => ({
      //           type: "radiogroup",
      //           name: poll.pollId,
      //           title: poll.question,
      //           choices: poll.options.map((option) => option.value),
      //         })),
      //       })
      //     }
      //   /> */}

      //   {/* {polls.map((poll) => {
      //     const chartData = poll.options.map((option) => ({
      //       name: option.value,
      //       value: option.votes || 0,
      //     }));

      //     return (
      //       <div key={poll.pollId} className="mt-4">
      //         <h3>{poll.question}</h3>
      //         <Bar data={renderChart(poll.options)} />
      //         <ResponsiveContainer width="100%" height={300}>
      //           <PieChart>
      //             <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
      //               {chartData.map((_entry, index) => (
      //                 <Cell
      //                   key={`cell-${index}`}
      //                   fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
      //                 />
      //               ))}
      //             </Pie>
      //           </PieChart>
      //         </ResponsiveContainer>
      //       </div>
      //     );
      //   })} */}

      //   {polls.map((poll) => {
      //     const chartData = poll.options.map((option) => ({
      //       name: option.value,
      //       value: option.votes || 0,
      //     }));

      //     return (
      //       <div
      //         key={poll.pollId}
      //         style={{
      //           display: "flex",
      //           alignItems: "center",
      //           marginBottom: "20px",
      //         }}
      //       >
      //         <div style={{ flex: 1, marginRight: "20px" }}>
      //           <h3>{poll.question}</h3>
      //           <Survey
      //             model={
      //               new SurveyCore.Model({
      //                 questions: [
      //                   {
      //                     type: "radiogroup",
      //                     name: poll.pollId,
      //                     title: poll.question,
      //                     choices: poll.options.map((option) => option.value),
      //                   },
      //                 ],
      //               })
      //             }
      //           />
      //         </div>

      //         {/* <div style={{ flex: 1 }}>
      //           <Bar
      //             data={renderChart(poll.options)}
      //             options={{ responsive: true }}
      //           />
      //         </div> */}
      //         <div style={{ flex: 1 }}>
      //           <ResponsiveContainer width="100%" height={300}>
      //             <PieChart>
      //               <Pie
      //                 data={chartData}
      //                 dataKey="value"
      //                 nameKey="name"
      //                 outerRadius={100}
      //                 label
      //               >
      //                 {chartData.map((_entry, index) => (
      //                   <Cell
      //                     key={`cell-${index}`}
      //                     fill={`#${Math.floor(Math.random() * 16777215).toString(
      //                       16
      //                     )}`}
      //                   />
      //                 ))}
      //               </Pie>
      //             </PieChart>
      //           </ResponsiveContainer>
      //         </div>
      //       </div>
      //     );
      //   })}
      // </div>
    );
  }
};
export default Polls;
