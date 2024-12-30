
 
//  import React, { useState } from "react";


//  type Attraction = {
//     name: string;
//     url: string;
//     mapsUrl: string;
//     imageUrl: string;
//   };
  
//   type Restaurant = {
//     name: string;
//     url: string;
//     mapsUrl: string;
//     imageUrl: string;
//   };
  
//   type Hotel = {
//     name: string;
//     url: string;
//     mapsUrl: string;
//     imageUrl: string;
//   };
  
//   type Area = {
//     id: number;
//     name: string;
//     imageUrl: string;
//     attractions: Attraction[];
//     restaurants: Restaurant[];
//     hotels: Hotel[];
//     siteUrl: string;
//     mapsUrl: string;
//     [key: string]: any; // חתימה דינמית שמאפשרת גישה למאפיינים כמו "attractions", "restaurants", "hotels"
//   };
  
//   type Item = Attraction | Restaurant | Hotel; 
  



//   const IdeasForTrips = () => {
//     const [step, setStep] = useState<number>(1);
//     const [selectedArea, setSelectedArea] = useState<Area | null>(null);
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//     const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
//     const areasData: Area[] = [
//       // נתוני האזורים
//       {
//         id: 1,
//         name: "תל אביב",
//         imageUrl: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSgz16pugAnk6J8lt9zSMDyL6TduyJ8zzsW3mfWJOKFMyQ7m9DtjZH6jSDfT0njfIaACvnmJuSuaFqZqnGVogW30wZOZid3H9aw24StnQ",
//         attractions: [
//           { name: "חוף הים בתל אביב", url: "https://www.tel-aviv.gov.il/eng/", mapsUrl: "https://www.google.com/maps?q=tel+aviv+beach", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Tel_Aviv_Beach.jpg" },
//           { name: "מוזיאון תל אביב לאומניות", url: "https://www.tamuseum.org.il/en/", mapsUrl: "https://www.google.com/maps?q=Tel+Aviv+Museum+of+Art", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Tel_Aviv_Museum_of_Art.jpg" },
//         ],
//         restaurants: [
//           { name: "מסעדת 'מול ים'", url: "https://www.mulyam.co.il/", mapsUrl: "https://www.google.com/maps?q=MULYAM+restaurant", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Restaurant_Icon.jpg" },
//         ],
//         hotels: [
//           { name: "מלון דיויד אינטרקונטיננטל", url: "https://www.danhotels.com/david-intercontinental", mapsUrl: "https://www.google.com/maps?q=Intercontinental+Hotel+Tel+Aviv", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Intercontinental_Hotel_Tel_Aviv.jpg" },
//         ],
//         siteUrl: "https://www.tel-aviv.gov.il/eng/",
//         mapsUrl: "https://www.google.com/maps/place/Tel+Aviv"
//       },
//       {
//         id: 2,
//         name: "ירושלים",
//         imageUrl: "data:image/jpeg;base64,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",
//         attractions: [
//           { name: "כותל המערבי", url: "https://www.itsyourjerusalem.com/he/%d7%94%d7%9b%d7%95%d7%aa%d7%9c-%d7%94%d7%9e%d7%a2%d7%a8%d7%91%d7%99/", mapsUrl: "https://www.google.com/maps?q=Western+Wall", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Western_Wall.jpg" },
//         ],
//         restaurants: [
//           { name: "המסעדה האיטלקית 'דומיניקו'", url: "https://www.dominico.co.il/", mapsUrl: "https://www.google.com/maps?q=Dominico+Restaurant", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Dominico.jpg" },
//         ],
//         hotels: [
//           { name: "מלון המלך דוד", url: "https://www.kingdavidhotel.co.il/", mapsUrl: "https://www.google.com/maps?q=King+David+Hotel",imageUrl: '' },
//         ],
//         siteUrl: "https://www.jerusalem.muni.il/en/",
//         mapsUrl: "https://www.google.com/maps/place/Jerusalem"
//       },
//     ];
  
//     // פונקציה למעבר בין שלבים
//     const goToStep = (newStep: number) => {
//       setStep(newStep);
//       if (newStep === 1) {
//         setSelectedArea(null);
//         setSelectedCategory(null);
//         setSelectedItem(null);
//       }
//     };
  
//     // הצגת התצוגה של כל האזורים
//     const renderAreas = () => {
//       return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {areasData.map((area) => (
//             <div
//               key={area.id}
//               className="relative h-64 bg-cover bg-center rounded-lg shadow-lg overflow-hidden cursor-pointer"
//               style={{ backgroundImage: `url('${area.imageUrl}')` }}
//               onClick={() => { setSelectedArea(area); goToStep(2); }}
//             >
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-bold text-lg">
//                 <button className="bg-pink-600 px-6 py-2 rounded-lg">{area.name}</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     };
  
//     // הצגת האטרקציות, המסעדות והמלונות של האזור
//     const renderCategorySelection = () => {
//       return (
//         <div>
//           <button onClick={() => setSelectedCategory("attractions")} className="bg-blue-500 px-4 py-2 rounded-lg text-white mr-4">אטרקציות</button>
//           <button onClick={() => setSelectedCategory("restaurants")} className="bg-green-500 px-4 py-2 rounded-lg text-white mr-4">מסעדות</button>
//           <button onClick={() => setSelectedCategory("hotels")} className="bg-red-500 px-4 py-2 rounded-lg text-white">מלונות</button>
//         </div>
//       );
//     };
  
//     // הצגת רשימת פריטים לפי הקטגוריה שנבחרה
//     const renderItems = () => {
//       const items = selectedArea ? selectedArea[selectedCategory || ""] : [];
//       return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {items.map((item: Item) => (
//             <div
//               key={item.name}
//               className="cursor-pointer bg-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl"
//               onClick={() => { setSelectedItem(item); goToStep(3); }}
//             >
//               <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
//               <h3 className="font-semibold">{item.name}</h3>
//             </div>
//           ))}
//         </div>
//       );
//     };
  
//     // הצגת המידע על האטרקציה/מסעדה/מלון
//     const renderItemDetails = () => {
//       if (!selectedItem) return null;
//       return (
//         <div className="mt-6 p-6 border border-gray-300 rounded-lg">
//           <h2 className="text-3xl font-semibold">{selectedItem.name}</h2>
//           <img src={selectedItem.imageUrl} alt={selectedItem.name} className="w-full h-64 object-cover rounded-lg mt-4" />
//           <div className="mt-4">
//             <a href={selectedItem.url} target="_blank" className="text-blue-500 hover:text-blue-700">
//               קישור לאתר
//             </a>{" "}
//             -{" "}
//             <a href={selectedItem.mapsUrl} target="_blank" className="text-blue-500 hover:text-blue-700">
//               גוגל מפות
//             </a>
//           </div>
//         </div>
//       );
//     };
  
//     return (
//       <div className="p-6">
//         {step === 1 && renderAreas()}
//         {step === 2 && selectedArea && renderCategorySelection()}
//         {step === 2 && selectedCategory && renderItems()}
//         {step === 3 && renderItemDetails()}
//         {step > 1 && (
//           <button onClick={() => goToStep(step - 1)} className="bg-gray-600 text-white px-4 py-2 rounded-lg mt-6">
//             חזור
//           </button>
//         )}
//       </div>
//     );
//   };

//   export default IdeasForTrips;



  
  