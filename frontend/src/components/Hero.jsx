import hero from "../assets/hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="w-full min-h-screen bg-fixed bg-center bg-cover flex flex-row items-center justify-end md:p-8"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="flex flex-col items-end h-full text-panna text-center opacity-90 p-4">
        <h1 className="md:text-7xl text-4xl font-semibold mb-6 md:mb-10">VINERY</h1>
        <h2 className="md:text-5xl text-sm md:mb-2">ENJOY EACH GLASS</h2>
        <span className="md:text-5xl text-sm md:mb-10 mb-4">LIKE A NEW EXPERIENCE</span>
        <Link to="/products" className="bg-darkbrown md:text-xl text-sm text-panna py-1 md:py-3 px-3 md:px-5 rounded-full border-none">
          EXPLORE OUR WINES
        </Link>
      </div>
    </section>
  );
};

export default Hero;
