

// import {Option, Question, Survey} from "@/app/types/survy"


// export const sendSurvey =(surveys: Survey[], currentSurveyId: number | null)  => {
//     const currentSurvey = surveys.find((s) => s.id === currentSurveyId);
//     if (!currentSurvey) return;

//     // console.log(currentSurvey);
    
  
  
//     const emails = prompt('Enter recipient emails separated by commas:');
//     if (!emails) return;
  



//     fetch('/api/sendSurvey', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         emails: emails.split(',').map((email) => email.trim()),
//         subject: `Survey Results: ${currentSurvey.title}`,
//         surveyResults: currentSurvey,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         alert(data.message || 'Survey sent successfully!');
//       })
//       .catch((err) => {
//         console.error(err);
//         alert('Failed to send survey.');
//       });
//   };


  




import { Option, Question, Survey } from "@/app/types/survy";

// export const sendSurvey = (surveys: Survey[], currentSurveyId: number | null) => {
//   const currentSurvey = surveys.find((s) => s.id === currentSurveyId);
//   if (!currentSurvey) return;

//   // אם אין סקר תקין, אז לצאת מהפונקציה
//   const emails = prompt('Enter recipient emails separated by commas:');
//   if (!emails) return;

//   // נתוני ההודעה שתשלח
//   const message = `קיים סקר נא לפתוח את הסקר עם הכותרת: ${currentSurvey.title}`;

//   fetch('/api/sendSurvey', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       emails: emails.split(',').map((email) => email.trim()),
//       subject: `קיים סקר: ${currentSurvey.title}`,
//       surveyResults: { message },  // שולחים את ההודעה במקום את תוצאות הסקר
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       alert(data.message || 'Survey sent successfully!');
//     })
//     .catch((err) => {
//       console.error(err);
//       alert('Failed to send survey.');
//     });
// };








export const sendSurvey = (surveys: Survey[], currentSurveyId: number | null) => {
    const currentSurvey = surveys.find((s) => s.id === currentSurveyId);
    if (!currentSurvey) return;
  
    const emails = prompt('Enter recipient emails separated by commas:');
    if (!emails) return;
  
    fetch('/api/sendSurvey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emails: emails.split(',').map((email) => email.trim()),
        subject: `Survey Results: ${currentSurvey.title}`,
        surveyResults: currentSurvey,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to send request to API');
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message || 'Survey sent successfully!');
      })
      .catch((err) => {
        console.error("Error in client-side sendSurvey:", err); // הדפסת השגיאה בצד הלקוח
        alert('Failed to send survey.');
      });
  };