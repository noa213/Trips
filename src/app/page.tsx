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
        style={{ backgroundColor: "#f7f2e7" }} // גוון בז בהגדרת הסטייל
      >
        <h1 className="text-4xl md:text-6xl font-light text-center text-[#9B111E]"
        >
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






