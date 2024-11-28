


// // pages/index.tsx
// import Footer from '@/app/components/Footer'
// import Navbar from '@/app/components/Navbar'

// const Home = () => {
//   return (
//     <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,landscape')" }}>
      
 
//       <div className="flex items-center justify-center min-h-screen bg-opacity-60 bg-black text-white">
//         <h1 className="text-4xl md:text-6xl font-bold text-center">
//           ברוך הבא ל-Triply<br />
//           התחל לתכנן את הטיול הבא שלך!
//         </h1>
//       </div>
      
//       <Footer />
//     </div>
//   );
// }

// export default Home;




// // pages/index.tsx
// import Footer from '@/app/components/Footer';
// import Navbar from '@/app/components/Navbar';

// const Home = () => {
//   // רשימת ה-URL של התמונות
//   const images = [
//     'https://cdn.istores.co.il/image/upload/c_mpad,g_center,h_350,w_870/c_crop,h_350,w_870/clients/15167/7ce9bc009d68eea5e18d661c918c38e076947a00.jpg', // תמונה 1
//     'https://www.tapet3d.co.il/files/products/product102_image1_2021-04-21_10-10-52.jpg', // תמונה 2
//     'https://www.tapet3d.co.il/files/products/product40_image1_2021-04-02_18-01-44.jpg', // תמונה 3
//     'https://www.google.com/imgres?q=%D7%A0%D7%95%D7%A4%D7%99%D7%9D&imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa3%2F20%2F3c%2Fa3203ccff012d0c20f2df959d7ebbc56.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpin%2Fswitzerland--492581277998893817%2F&docid=Bulrp1_-GtYpZM&tbnid=sPqC7DgGchJ5AM&vet=12ahUKEwiIhIfE2f6JAxU6iv0HHWEXKhoQM3oECD8QAA..i&w=1200&h=801&hcb=2&ved=2ahUKEwiIhIfE2f6JAxU6iv0HHWEXKhoQM3oECD8QAA', // תמונה 4
//     'https://www.google.com/imgres?q=%D7%A0%D7%95%D7%A4%D7%99%D7%9D&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D1949299078425464&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D1949299078425464%26id%3D493185877370132%26set%3Da.678579602164091%26locale%3Dfr_CA&docid=lunUCAKNpRjkdM&tbnid=e0dUbQmzPqkZMM&vet=12ahUKEwiIhIfE2f6JAxU6iv0HHWEXKhoQM3oECF8QAA..i&w=681&h=370&hcb=2&itg=1&ved=2ahUKEwiIhIfE2f6JAxU6iv0HHWEXKhoQM3oECF8QAA', // תמונה 5
//     'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lametayel.co.il%2Farticles%2F87x47&psig=AOvVaw2wK8IQeGv10eLmEeHTbkaj&ust=1732872040871000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPj5_e3Z_okDFQAAAAAdAAAAABAE', // תמונה 6
//   ];

//   return (
//     <div className="relative min-h-screen bg-gray-100">
     

//       {/* כותרת ותוכן ראשי */}
//       <div
//         className="flex items-center justify-center min-h-screen bg-opacity-60 bg-black text-white"
//         style={{ backgroundColor: "#9B111E" }}
//       >
//         <h1 className="text-4xl md:text-6xl font-bold text-center">
//          Welcome to Triply<br />
//          Discover the world and plan your perfect trip!
//         </h1>
//       </div>

//       {/* גלריית תמונות */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
//         {images.map((imageUrl, index) => (
//           <div
//             key={index}
//             className="relative h-64 bg-cover bg-center rounded-lg shadow-lg"
//             style={{
//               backgroundImage: `url('${imageUrl}')`,
//             }}
//           >
//             <div className="absolute inset-0 bg-black bg-opacity-25 rounded-lg flex items-center justify-center text-white font-bold text-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
//               Explore
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* פוטר */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;




















// pages/index.tsx 
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

const Home = () => {
  // רשימת ה-URL של התמונות
  const images = [
    'https://cdn.istores.co.il/image/upload/c_mpad,g_center,h_350,w_870/c_crop,h_350,w_870/clients/15167/7ce9bc009d68eea5e18d661c918c38e076947a00.jpg', // תמונה 1
    'https://www.tapet3d.co.il/files/products/product102_image1_2021-04-21_10-10-52.jpg', // תמונה 2
    'https://www.tapet3d.co.il/files/products/product40_image1_2021-04-02_18-01-44.jpg', // תמונה 3
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK9bprMa4GO_M3QmS58SxxQMUsOsdVo9Z4nA&s',
    'https://www.ynet.co.il/PicServer5/2019/09/19/9493608/949360001000100980653no.jpg', // תמונה 6
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRR5s-6kSiCQMYZQyRWrsS7c8tjERYTimQwDWtG4MNDeiBmpT5HQ6tpbDTs7ndUMpVY5GTLUo3BpZg4gvJrxQT1EFYvpTOpYVo8MNrrF4hXymTHr2YrV0cGfg&usqp=CAc',
  ];

  return (
    <div className="relative min-h-screen bg-gray-100">
     
      {/* כותרת ותוכן ראשי */}
      <div
        className="flex items-center justify-center min-h-screen bg-opacity-60 bg-black text-white"
        style={{ backgroundColor: "#f7f2e7" }}
      >
        <h1 className="text-4xl md:text-6xl font-light text-center text-[#9B111E]">
          Welcome to Triply<br />
          Discover the world and plan your perfect trip!
        </h1>
      </div>

      {/* גלריית תמונות */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className="relative h-64 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundImage: `url('${imageUrl}')`,
            }}
          >
            {/* <div className="absolute inset-0 bg-black bg-opacity-25 rounded-lg flex items-center justify-center text-white font-bold text-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
              Explore
            </div> */}
          </div>
        ))}
      </div>

      {/* פוטר */}
      <Footer />
    </div>
  );
};

export default Home;










