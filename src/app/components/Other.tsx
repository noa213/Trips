














// "use client"
// import React, { useState, useEffect } from 'react';

// const HomePage = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   const images = [
//     "https://www.tapet3d.co.il/files/products/product102_image1_2021-04-21_10-10-52.jpg",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK9bprMa4GO_M3QmS58SxxQMUsOsdVo9Z4nA&s",
   
//   ];

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % images.length);
//         setFade(true);
//       }, 500); // Match this timeout to the CSS transition duration
//     }, 3000); // Change images every 3 seconds

//     return () => clearInterval(intervalId);
//   }, [images.length]);

//   return (
//     <div className="homepage">
//       <div className={`image-slideshow ${fade ? 'fade-in' : 'fade-out'}`}>
//         <img src={images[currentImageIndex]} alt="Delicious Cake" />
//       </div>

//     </div>
//   );
// };

// export default HomePage;