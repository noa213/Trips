// import React, { useState } from "react";

// const IdeasForTrips = () => {
//   const areasData = [
//     {
//       id: 1,
//       name: "תל אביב",
//       imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Tel_Aviv_Skyline.jpg",
//       attractions: [
//         { name: "חוף הים בתל אביב", url: "https://www.tel-aviv.gov.il" },
//         { name: "מוזיאון תל אביב לאומניות", url: "https://www.tamuseum.org.il" },
//         { name: "שדרות רוטשילד", url: "https://www.tel-aviv.gov.il" },
//       ],
//       restaurants: [
//         { name: "מסעדת 'מול ים'", url: "https://www.mulyam.co.il" },
//         { name: "רוטשילד 12", url: "https://www.rothschild12.co.il" },
//         { name: "מסעדת 'שלהבת'", url: "https://www.shelevet.co.il" },
//       ],
//       hotels: [
//         { name: "מלון דיויד אינטרקונטיננטל", url: "https://www.danhotels.com" },
//         { name: "מלון ממילא", url: "https://www.mamillahotel.com" },
//         { name: "מלון דן תל אביב", url: "https://www.danhotels.com" },
//       ],
//       siteUrl: "https://www.tel-aviv.gov.il",
//       mapsUrl: "https://www.google.com/maps/place/Tel+Aviv"
//     },
//     {
//       id: 2,
//       name: "ירושלים",
//       imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Old_City_of_Jerusalem_2015.jpg",
//       attractions: [
//         { name: "כותל המערבי", url: "https://www.itsyour Jerusalem.co.il" },
//         { name: "מוזיאון ישראל", url: "https://www.imj.org.il" },
//         { name: "העיר העתיקה", url: "https://www.jerusalem.muni.il" },
//       ],
//       restaurants: [
//         { name: "מסעדת 'האוויר הישן'", url: "https://www.oldair.co.il" },
//         { name: "המסעדה האיטלקית 'דומיניקו'", url: "https://www.dominico.co.il" },
//         { name: "מסעדת 'רפאל'", url: "https://www.rafaelrestaurant.co.il" },
//       ],
//       hotels: [
//         { name: "מלון המלך דוד", url: "https://www.kingdavidhotel.co.il" },
//         { name: "מלון נרקיס ירושלים", url: "https://www.narkishotel.co.il" },
//         { name: "מלון הר ציון", url: "https://www.mountzion.co.il" },
//       ],
//       siteUrl: "https://www.jerusalem.muni.il",
//       mapsUrl: "https://www.google.com/maps/place/Jerusalem"
//     },
//     {
//       id: 3,
//       name: "חיפה",
//       imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Bahai_Gardens_in_Haifa.jpg",
//       attractions: [
//         { name: "הגנים הבהאים", url: "https://www.bahai.org" },
//         { name: "מוזיאון חיפה לאומניות", url: "https://www.hms.org.il" },
//         { name: "תצפית הר הכרמל", url: "https://www.haifa.muni.il" },
//       ],
//       restaurants: [
//         { name: "מסעדת 'שדרות חיפה'", url: "https://www.sderothhaifa.co.il" },
//         { name: "קפה גרג", url: "https://www.cafe-greg.co.il" },
//         { name: "מסעדת 'דרום'", url: "https://www.dromrestaurant.co.il" },
//       ],
//       hotels: [
//         { name: "מלון דן כרמל", url: "https://www.danhotels.com" },
//         { name: "מלון קראון פלזה", url: "https://www.crowneplaza.com" },
//         { name: "מלון סיטי סנטר", url: "https://www.citycenterhotel.co.il" },
//       ],
//       siteUrl: "https://www.haifa.muni.il",
//       mapsUrl: "https://www.google.com/maps/place/Haifa"
//     }
//   ];

//   // עדכון ה-state כך שיתאים למבנה האובייקט של האזור
//   const [selectedArea, setSelectedArea] = useState<typeof areasData[0] | null>(null);

//   return (
//     <div className="p-6">
//       <h1 className="text-4xl font-bold text-center mb-6">אזורים לטייל בהם</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {areasData.map((area) => (
//           <div
//             key={area.id}
//             className="relative h-64 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
//             style={{ backgroundImage: `url('${area.imageUrl}')` }}
//           >
//             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-bold text-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
//               <button
//                 onClick={() => setSelectedArea(area)}
//                 className="bg-pink-600 px-6 py-2 rounded-lg shadow-lg hover:bg-pink-700 transition duration-300"
//               >
//                 {area.name}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedArea && (
//         <div className="mt-6 p-6 border border-gray-300 rounded-lg">
//           <h2 className="text-3xl font-semibold">{selectedArea.name}</h2>
//           <img
//             src={selectedArea.imageUrl}
//             alt={selectedArea.name}
//             className="w-full h-64 object-cover rounded-lg mt-4"
//           />
//           <div className="mt-4">
//             <h3 className="text-xl font-medium">אטרקציות:</h3>
//             <ul className="list-disc pl-5">
//               {selectedArea.attractions.map((attraction, index) => (
//                 <li key={index} className="text-gray-700">
//                   <a href={attraction.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                     {attraction.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-4">
//             <h3 className="text-xl font-medium">מסעדות:</h3>
//             <ul className="list-disc pl-5">
//               {selectedArea.restaurants.map((restaurant, index) => (
//                 <li key={index} className="text-gray-700">
//                   <a href={restaurant.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                     {restaurant.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-4">
//             <h3 className="text-xl font-medium">מלונות:</h3>
//             <ul className="list-disc pl-5">
//               {selectedArea.hotels.map((hotel, index) => (
//                 <li key={index} className="text-gray-700">
//                   <a href={hotel.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                     {hotel.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-6 flex justify-between">
//             <a
//               href={selectedArea.siteUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-blue-600 px-6 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-300"
//             >
//               אתר רשמי
//             </a>
//             <a
//               href={selectedArea.mapsUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-green-600 px-6 py-2 rounded-lg text-white hover:bg-green-700 transition duration-300"
//             >
//               גוגל מפות
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IdeasForTrips;

 import React, { useState } from "react";
type Attraction = {
    name: string;
    url: string;
    mapsUrl: string;
    imageUrl: string;
  };
  
  type Restaurant = {
    name: string;
    url: string;
    mapsUrl: string;
    imageUrl: string;
  };
  
  type Hotel = {
    name: string;
    url: string;
    mapsUrl: string;
    imageUrl: string;
  };
  
  type Area = {
    id: number;
    name: string;
    imageUrl: string;
    attractions: Attraction[];
    restaurants: Restaurant[];
    hotels: Hotel[];
    siteUrl: string;
    mapsUrl: string;
    [key: string]: any; // חתימה דינמית שמאפשרת גישה למאפיינים כמו "attractions", "restaurants", "hotels"
  };
  
  type Item = Attraction | Restaurant | Hotel; 
  
  const AreasComponent = () => {
    const [step, setStep] = useState<number>(1);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
    const areasData: Area[] = [
      // נתוני האזורים
      {
        id: 1,
        name: "תל אביב",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Tel_Aviv_Skyline.jpg",
        attractions: [
          { name: "חוף הים בתל אביב", url: "https://www.tel-aviv.gov.il/eng/", mapsUrl: "https://www.google.com/maps?q=tel+aviv+beach", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Tel_Aviv_Beach.jpg" },
          { name: "מוזיאון תל אביב לאומניות", url: "https://www.tamuseum.org.il/en/", mapsUrl: "https://www.google.com/maps?q=Tel+Aviv+Museum+of+Art", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Tel_Aviv_Museum_of_Art.jpg" },
        ],
        restaurants: [
          { name: "מסעדת 'מול ים'", url: "https://www.mulyam.co.il/", mapsUrl: "https://www.google.com/maps?q=MULYAM+restaurant", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Restaurant_Icon.jpg" },
        ],
        hotels: [
          { name: "מלון דיויד אינטרקונטיננטל", url: "https://www.danhotels.com/david-intercontinental", mapsUrl: "https://www.google.com/maps?q=Intercontinental+Hotel+Tel+Aviv", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Intercontinental_Hotel_Tel_Aviv.jpg" },
        ],
        siteUrl: "https://www.tel-aviv.gov.il/eng/",
        mapsUrl: "https://www.google.com/maps/place/Tel+Aviv"
      },
      {
        id: 2,
        name: "ירושלים",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Old_City_of_Jerusalem_2015.jpg",
        attractions: [
          { name: "כותל המערבי", url: "https://www.itsyourjerusalem.com/he/%d7%94%d7%9b%d7%95%d7%aa%d7%9c-%d7%94%d7%9e%d7%a2%d7%a8%d7%91%d7%99/", mapsUrl: "https://www.google.com/maps?q=Western+Wall", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Western_Wall.jpg" },
        ],
        restaurants: [
          { name: "המסעדה האיטלקית 'דומיניקו'", url: "https://www.dominico.co.il/", mapsUrl: "https://www.google.com/maps?q=Dominico+Restaurant", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Dominico.jpg" },
        ],
        hotels: [
          { name: "מלון המלך דוד", url: "https://www.kingdavidhotel.co.il/", mapsUrl: "https://www.google.com/maps?q=King+David+Hotel", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/King_David_Hotel_Jerusalem.jpg" },
        ],
        siteUrl: "https://www.jerusalem.muni.il/en/",
        mapsUrl: "https://www.google.com/maps/place/Jerusalem"
      },
    ];
  
    // פונקציה למעבר בין שלבים
    const goToStep = (newStep: number) => {
      setStep(newStep);
      if (newStep === 1) {
        setSelectedArea(null);
        setSelectedCategory(null);
        setSelectedItem(null);
      }
    };
  
    // הצגת התצוגה של כל האזורים
    const renderAreas = () => {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areasData.map((area) => (
            <div
              key={area.id}
              className="relative h-64 bg-cover bg-center rounded-lg shadow-lg overflow-hidden cursor-pointer"
              style={{ backgroundImage: `url('${area.imageUrl}')` }}
              onClick={() => { setSelectedArea(area); goToStep(2); }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-bold text-lg">
                <button className="bg-pink-600 px-6 py-2 rounded-lg">{area.name}</button>
              </div>
            </div>
          ))}
        </div>
      );
    };
  
    // הצגת האטרקציות, המסעדות והמלונות של האזור
    const renderCategorySelection = () => {
      return (
        <div>
          <button onClick={() => setSelectedCategory("attractions")} className="bg-blue-500 px-4 py-2 rounded-lg text-white mr-4">אטרקציות</button>
          <button onClick={() => setSelectedCategory("restaurants")} className="bg-green-500 px-4 py-2 rounded-lg text-white mr-4">מסעדות</button>
          <button onClick={() => setSelectedCategory("hotels")} className="bg-red-500 px-4 py-2 rounded-lg text-white">מלונות</button>
        </div>
      );
    };
  
    // הצגת רשימת פריטים לפי הקטגוריה שנבחרה
    const renderItems = () => {
      const items = selectedArea ? selectedArea[selectedCategory || ""] : [];
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map((item: Item) => (
            <div
              key={item.name}
              className="cursor-pointer bg-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl"
              onClick={() => { setSelectedItem(item); goToStep(3); }}
            >
              <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="font-semibold">{item.name}</h3>
            </div>
          ))}
        </div>
      );
    };
  
    // הצגת המידע על האטרקציה/מסעדה/מלון
    const renderItemDetails = () => {
      if (!selectedItem) return null;
      return (
        <div className="mt-6 p-6 border border-gray-300 rounded-lg">
          <h2 className="text-3xl font-semibold">{selectedItem.name}</h2>
          <img src={selectedItem.imageUrl} alt={selectedItem.name} className="w-full h-64 object-cover rounded-lg mt-4" />
          <div className="mt-4">
            <a href={selectedItem.url} target="_blank" className="text-blue-500 hover:text-blue-700">
              קישור לאתר
            </a>{" "}
            -{" "}
            <a href={selectedItem.mapsUrl} target="_blank" className="text-blue-500 hover:text-blue-700">
              גוגל מפות
            </a>
          </div>
        </div>
      );
    };
  
    return (
      <div className="p-6">
        {step === 1 && renderAreas()}
        {step === 2 && selectedArea && renderCategorySelection()}
        {step === 2 && selectedCategory && renderItems()}
        {step === 3 && renderItemDetails()}
        {step > 1 && (
          <button onClick={() => goToStep(step - 1)} className="bg-gray-600 text-white px-4 py-2 rounded-lg mt-6">
            חזור
          </button>
        )}
      </div>
    );
  };
  
  export default AreasComponent;
  