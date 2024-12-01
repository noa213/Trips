// "use client";
// import React, { useEffect, useState } from "react";
// import * as Survey from "survey-react-ui";
// import { Model } from "survey-core";
// import "survey-core/defaultV2.min.css";

// const Surveys = () => {
//     const [surveyModel, setSurveyModel] = useState<Survey.Model | null>(null);

//     useEffect(() => {
//       const model = new Model(surveyJson);
  
//       model.onComplete.add((sender) => {
//         // const results = sender.data;
//         console.log("תוצאות הסקר:", sender.data);      });
  
//       setSurveyModel(model);
//     }, []);
  
//   const surveyJson = {
//     title: "סקר לדוגמה",
//     showProgressBar: "top",
//     pages: [
//       {
//         questions: [
//           {
//             type: "radiogroup",
//             name: "favorite_activity",
//             title: "מה הפעילות המועדפת עליך בטיול?",
//             choices: ["טיול רגלי", "ארוחה במסעדה", "ביקור במוזיאון"],
//           },
//           {
//             type: "text",
//             name: "feedback",
//             title: "יש לך הערות או הצעות לשיפור?",
//           },
//         ],
//       },
//       {
//         questions: [
//           {
//             type: "radiogroup",
//             name: "enjoy_activity",
//             title: "ממה הכי נהנית בטיול?",
//             choices: ["טיול רגלי", "ארוחה במסעדה", "ביקור במוזיאון"],
//           },
//           {
//             type: "text",
//             name: "enjoy_feedback",
//             title: "יש לך הערות או הצעות לשיפור?",
//           },
//         ],
//       },
//     ],
//   };

//   return (
//     <div>
//       {surveyModel && <Survey.Survey model={surveyModel} />}
//     </div>
//   );};

// export default Surveys;
