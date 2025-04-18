import shop from "../assets/shop.jpg";
import { Link } from "react-router-dom";

const History = () => {
  return (
    <section className="w-full min-h-screen bg-none md:grid md:grid-cols-5">
      <div className="md:col-span-3 w-full md:px-28 md:pt-10 flex flex-col items-start p-8 md:items-end justify-center text-end">
        <h2 className="md:text-5xl text-2xl font-semibold md:mb-12 mb-6 text-darkbrown">VINERY</h2>
        <span className="text-orange mb-2 md:text-lg text-sm">Founded in 1999</span>
        <p className="md:text-xl text-sm text-darkbrown mb-10 md:text-end text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatibus. Quisquam, voluptatibus. Quisquam, voluptatibus.
          Quisquam, voluptatibus. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Dolorem corporis quisquam id eum, nesciunt suscipit
          libero labore deserunt dolore commodi doloremque dolores ea laborum
          atque amet, voluptatem ad, maiores sequi?
        </p>
        <Link to="/products" className="bg-darkbrown text-panna md:py-3 py-1 md:px-5 px-3 rounded-full border-none md:text-lg text-sm">
          EXPLORE OUR WINES
        </Link>
      </div>
      <div className="md:col-span-2 w-full md:h-screen relative">
        <img className="max-h-screen w-full object-cover" src={shop} alt="" />
      </div>
    </section>
  );
};

export default History;
