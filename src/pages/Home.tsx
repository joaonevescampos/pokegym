import { Link } from "react-router-dom";
import backgroundImage from "../assets/background-home.png";
import charizardImage from "../assets/charizard.png";
import pokeballImage from "../assets/pokeball-background.png";
import CarouselMenu from "@/components/CarouselMenu";

const Home = () => {
  return (
    <main className="w-full h-screen">
      <img
        src={backgroundImage}
        alt="home"
        className="absolute left-0 w-full object-cover h-full opacity-10 z-0"
      />
      <section className="flex flex-col items-center justify-center w-full h-full">
        <Link
          to="/"
          className="text-white font-bold absolute top-4 right-4 text-sm"
        >
          Guia tutorial
        </Link>
        <div className="flex flex-col gap-4 items-center justify-center text-white px-4 z-10">
          <img
            src={charizardImage}
            alt="charizard"
            className="z-10 max-lg:w-48 animate-pokemon"
          />
          <img
            src={pokeballImage}
            alt="pokeball"
            className="absolute z-0 w-100"
          />
          <h1 className="text-2xl font-bold z-10">Bem vindo ao POKEGYM</h1>
          <p className="text-center max-w-150 text-sm z-10">
            Seja o maior dos mestres pokemon e embarque na maior aventura!
            Batalhar, capturar e treinar todos os pokémons sendo produtivo!
          </p>
          <CarouselMenu />
        </div>
      </section>
    </main>
  );
};

export default Home;
