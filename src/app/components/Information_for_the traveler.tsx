"use client"
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
  id: number ;
  name: string;
  imageUrl: string;
  attractions: Attraction[];
  restaurants: Restaurant[];
  hotels: Hotel[];
  siteUrl: string;
  mapsUrl: string;
  [key: number]: Attraction[] | Restaurant[] | Hotel[] | string;
};

type Item = Attraction | Restaurant | Hotel;




const Information_for_the_traveler = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);



  const areasData = [
    // נתוני האזורים
    {
      id: 1,
      name: "תל אביב",
      imageUrl: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSgz16pugAnk6J8lt9zSMDyL6TduyJ8zzsW3mfWJOKFMyQ7m9DtjZH6jSDfT0njfIaACvnmJuSuaFqZqnGVogW30wZOZid3H9aw24StnQ",
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
      imageUrl: "/img/jerusalem.jpg",
      attractions: [
        { name: "כותל המערבי", url: "https://www.itsyourjerusalem.com/he/%d7%94%d7%9b%d7%95%d7%aa%d7%9c-%d7%94%d7%9e%d7%a2%d7%a8%d7%91%d7%99/", mapsUrl: "https://www.google.com/maps?q=Western+Wall", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Western_Wall.jpg" },
      ],
      restaurants: [
        { name: "המסעדה האיטלקית 'דומיניקו'", url: "https://www.dominico.co.il/", mapsUrl: "https://www.google.com/maps?q=Dominico+Restaurant", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Dominico.jpg" },
      ],
      hotels: [
        { name: "מלון המלך דוד", url: "https://www.kingdavidhotel.co.il/", mapsUrl: "https://www.google.com/maps?q=King+David+Hotel", imageUrl: "/img/king_david.jpg" },
      ],
      siteUrl: "https://www.jerusalem.muni.il/en/",
      mapsUrl: "https://www.google.com/maps/place/Jerusalem"
    },
    {
      id: 3,
      name: "טבריה",
      imageUrl: "/img/teberia.jpg",
      attractions: [
        { name: "כנרת", url: "https://www.goisrael.com/he/attraction/6123", mapsUrl: "https://www.google.com/maps?q=Sea+of+Galilee", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/59/Sea_of_Galilee.jpg" },
      ],
      restaurants: [
        { name: "מסעדת הדס", url: "https://www.restaurants.co.il/restaurant/דס-טבריה", mapsUrl: "https://www.google.com/maps?q=Hadas+Restaurant+Tiberias", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/Hadas_Restaurant_Tiberias.jpg" },
      ],
      hotels: [
        { name: "מלון גולדן קראון", url: "https://www.goldencrown.co.il/", mapsUrl: "https://www.google.com/maps?q=Golden+Crown+Hotel+Tiberias", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Golden_Crown_Hotel_Tiberias.jpg" },
      ],
      siteUrl: "https://www.tiberias.muni.il/",
      mapsUrl: "https://www.google.com/maps/place/Tiberias"
    },
    {
      id: 4,
      name: "נתניה",
      imageUrl: "/img/netania.jpg",
      attractions: [
        { name: "חוף סירונית", url: "https://www.goisrael.com/he/attraction/1125", mapsUrl: "https://www.google.com/maps?q=Sironit+Beach", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Sironit_Beach_Netanya.jpg" },
      ],
      restaurants: [
        { name: "מסעדת בריזה", url: "https://www.breeza.co.il/", mapsUrl: "https://www.google.com/maps?q=Breeza+Restaurant+Netanya", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Breeza_Restaurant_Netanya.jpg" },
      ],
      hotels: [
        { name: "מלון מרינה", url: "https://www.marina-hotel.co.il/", mapsUrl: "https://www.google.com/maps?q=Marina+Hotel+Netanya", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Marina_Hotel_Netanya.jpg" },
      ],
      siteUrl: "https://www.netanya.muni.il/",
      mapsUrl: "https://www.google.com/maps/place/Netanya"
    },
    {
      id: 5,
      name: "אילת",
      imageUrl: "/img/eilat.jpg",
      attractions: [
        { name: "הגנים הבהאים", url: "https://www.goisrael.com/he/attraction/266", mapsUrl: "https://www.google.com/maps?q=Baha'i+Gardens+Haifa", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Bahai_Gardens_Haifa.jpg" },
      ],
      restaurants: [
        { name: "מסעדת אלכסנדר", url: "https://www.alexander.co.il/", mapsUrl: "https://www.google.com/maps?q=Alexander+Restaurant+Haifa", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Alexander_Restaurant_Haifa.jpg" },
      ],
      hotels: [
        { name: "מלון דן חיפה", url: "https://www.danhotels.com/dan-haifa", mapsUrl: "https://www.google.com/maps?q=Dan+Haifa+Hotel", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Dan_Haifa_Hotel.jpg" },
      ],
      siteUrl: "https://www.haifa.muni.il/",
      mapsUrl: "https://www.google.com/maps/place/Haifa"
    },
    {
      id: 6,
      name: "Safed",
      imageUrl: "/img/tzefat.jpg",
      attractions: [
        { name: "הרי אילת", url: "https://www.goisrael.com/he/attraction/1472", mapsUrl: "https://www.google.com/maps?q=Eilat+Mountains", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Eilat_Mountains.jpg" },
      ],
      restaurants: [
        { name: "מסעדת 'אגאדיר'", url: "https://www.agadir-restaurants.co.il/", mapsUrl: "https://www.google.com/maps?q=Agadir+Restaurant+Eilat", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Agadir_Restaurant_Eilat.jpg" },
      ],
      hotels: [
        { name: "מלון רימונים אילת", url: "https://www.rimonim.com/he/hotels/eilat", mapsUrl: "https://www.google.com/maps?q=Rimonim+Hotel+Eilat", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Rimonim_Eilat.jpg" },
      ],
      siteUrl: "https://www.eilat.muni.il/",
      mapsUrl: "https://www.google.com/maps/place/Eilat"
    }
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
            <div className="  inset-0 flex items-center justify-center text-white font-bold text-lg hover:absolute hover:bg-black hover:bg-opacity-40 ">
              <button className="text-black px-6 py-2 rounded-lg">{area.name}</button>
            </div>
          </div>
        ))}
      </div>
    );
  };







  const renderCategorySelection = () => {
    return (
     


      <div className="container mx-auto p-4">
        {/* כפתורים למעבר בין הקטגוריות */}
        <div className="flex justify-center mb-8 space-x-4">
          {/* כפתור לאטרקציות */}
          <button
            onClick={() => setSelectedCategory("attractions")}
            className="relative w-48 h-48 rounded-lg overflow-hidden"
          >
            <img
              src="/img/activity.jpg" // שים כאן את הקישור לתמונה
              alt="Attractions Icon"
              className="object-cover w-full h-full absolute inset-0"
            />
            <span className="relative z-10 text-white text-xl font-semibold p-4">
              Attractions
            </span>
          </button>

        



          <button
            onClick={() => setSelectedCategory("restaurants")}
            className="relative w-48 h-48 rounded-lg overflow-hidden"
          >
            <img
              src="/img/resteraunt.jpg" 
              alt="Restaurants Icon"
              className="object-cover w-full h-full absolute inset-0"
            />
            <span className="relative z-10 text-white text-xl font-semibold p-4">
              Restaurants
            </span>
          </button>

         
          <button
            onClick={() => setSelectedCategory("hotels")}
            className="relative w-48 h-48 rounded-lg overflow-hidden"
          >
            <img
              src="/img/hotels.jpg" // שים כאן את הקישור לתמונה
              alt="Hotels Icon"
              className="object-cover w-full h-full absolute inset-0"
            />
            <span className="relative z-10 text-white text-xl font-semibold p-4">
              Hotels
            </span>
          </button>
        </div>
      </div>
    );
  };

  // הצגת רשימת פריטים לפי הקטגוריה שנבחרה
  // const renderItems = () => {
  //   const items = selectedArea ? selectedArea[selectedCategory: string] : [];
  //   return (
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  //       {items.map((item: Item) => (
  //         <div
  //           key={item.name}
  //           className="cursor-pointer bg-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl"
  //           onClick={() => { setSelectedItem(item); goToStep(3); }}
  //         >
  //           <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
  //           <h3 className="font-semibold">{item.name}</h3>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

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
    <div className="p-6 bg-[#f7f2e7]">
      {step === 1 && renderAreas()}
      {step === 2 && selectedArea && renderCategorySelection()}
      {step === 2 && selectedCategory }
      {step === 3 && renderItemDetails()}
      {step > 1 && (
        <button onClick={() => goToStep(step - 1)} className="bg-gray-600 text-white px-4 py-2 rounded-lg mt-6">
          חזור
        </button>
      )}

    </div>

  );
};

export default Information_for_the_traveler;
