import Hero from "../components/Hero";
import History from "../components/History";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="w-full min-h-screen bg-panna">
      <Navbar />
      <Hero />
      <History />
      <Features />
      <Footer />
    </main>
  );
};

export default Home;
