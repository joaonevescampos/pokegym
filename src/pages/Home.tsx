import { Link } from "react-router-dom";
import backgroundImage from "../assets/background-home.png";
import charizardImage from "../assets/charizard.png";
import pokeballImage from "../assets/pokeball-background.png";

const menu = [
  { name: "Meus pokémons", path: "/my-pokemons" },
  { name: "Capturar pokémons", path: "/capture-pokemon" },
  { name: "Configurações", path: "/seetings" },
  { name: "Batalha", path: "/rocket-team-battle" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Tutorial", path: "/" },


];

const Home = () => {
  return (
    <main className="w-full h-screen">
      <img
        src={backgroundImage}
        alt="home"
        className="absolute left-0 w-full object-cover h-full opacity-15 z-0"
      />
      <section className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col gap-4 items-center justify-center text-white px-4 z-10">
          <img src={charizardImage} alt="charizard" className="z-10" />
          <img
            src={pokeballImage}
            alt="pokeball"
            className="absolute z-0 w-100"
          />
          <h1 className="text-2xl font-bold z-10">Bem vindo ao POKEGYM</h1>
          <p className="text-center max-w-150 text-sm z-10">
            Seja o maior dos mestres pokemon e embarque na maior aventura!
            Batalhar, capturar e treinar todos os 68 pokémons sendo produtivo!
          </p>
          <ul className="grid grid-cols-3 max-lg:grid-cols-2 gap-4 w-full z-10">
            {menu.map((item, index) => (
              <li
                className="w-full min-w-36 min-h-24 bg-bt-purple rounded-2xl"
                key={index}
              >
                <Link
                  to={item.path}
                  className="flex items-center justify-center p-2 w-full h-full text-center font-bold"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
