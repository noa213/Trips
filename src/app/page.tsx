import Footer from "@/app/components/Footer";
import TripList from "./components/TripList";

const Home = () => {
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
