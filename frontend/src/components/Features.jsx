import skybolt from "../assets/SkyBolt.png";
import aerofoil from "../assets/AeroFoil.png";

const Features = () => {
  return (
    <section className="flex flex-col items-center md:my-10 w-full min-h-screen">
      <div className="flex flex-col md:px-28 px-4 w-full">
        {/* First Feature */}
        <div className="p-5 w-full flex md:flex-row flex-col bg-none md:h-screen h-auto">
          <div className="md:w-1/4 mx-auto w-1/2 mb-6 md:mb-0">
            <img
              className="object-contain h-full w-full"
              src={skybolt}
              alt="Skybolt Wine"
            />
          </div>
          <div className="hidden md:block w-[1px] bg-darkbrown"></div>
          <div className="flex flex-col md:w-3/4 w-full md:max-h-2/3 md:pl-14 text-darkbrown">
            <h2 className="md:text-6xl text-2xl font-semibold mb-4 md:max-w-1/2">
              The Skybolt Chardonnay— 2023
            </h2>
            <span className="text-orange text-lg mb-6 md:mb-16">White Wine</span>
            <p className="text-sm md:text-md mb-6 md:mb-16">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus. Quisquam, voluptatibus. Quisquam, voluptatibus.
              Quisquam, voluptatibus. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem corporis quisquam id eum, nesciunt
              suscipit libero labore deserunt dolore commodi doloremque dolores
              ea laborum atque amet, voluptatem ad, maiores sequi?
            </p>
            <button className="bg-darkbrown text-panna py-3 px-5 rounded-full border-none w-full max-w-[200px]">
              View in Store
            </button>
          </div>
        </div>

        {/* Second Feature */}
        <div className="p-5 w-full flex md:flex-row flex-col-reverse bg-none md:h-screen h-auto">
          <div className="flex flex-col md:items-end md:text-end md:w-3/4 w-full md:max-h-2/3 md:pr-14 text-darkbrown">
            <h2 className="md:text-6xl text-2xl font-semibold mb-4 md:max-w-3/4">
              The Aerofoil Cabernet Sauvignon— 2021
            </h2>
            <span className="text-orange text-lg mb-6 md:mb-16">White Wine</span>
            <p className="text-sm md:text-md mb-6 md:mb-16">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus. Quisquam, voluptatibus. Quisquam, voluptatibus.
              Quisquam, voluptatibus. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem corporis quisquam id eum, nesciunt
              suscipit libero labore deserunt dolore commodi doloremque dolores
              ea laborum atque amet, voluptatem ad, maiores sequi?
            </p>
            <button className="bg-darkbrown text-panna py-3 px-5 rounded-full border-none w-full max-w-[200px]">
              View in Store
            </button>
          </div>
          <div className="hidden md:block w-[1px] bg-darkbrown"></div>
          <div className="md:w-1/4 mx-auto w-1/2 mb-6 md:mb-0">
            <img
              className="object-contain h-full w-full"
              src={aerofoil}
              alt="Aerofoil Wine"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;