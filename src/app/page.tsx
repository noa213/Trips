import Footer from "@/app/components/Footer";
import TripList from "./components/TripList";

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
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?nature,landscape')",
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-opacity-60 bg-black text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          ברוך הבא ל-Triply
          <br />
          התחל לתכנן את הטיול הבא שלך!
        </h1>
      </div>
      <TripList />
      <Footer />
    </div>
  );
};

export default Home;










