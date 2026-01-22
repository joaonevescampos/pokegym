import PokemonCard from "../components/PokemonCard";
import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import { Link } from "react-router-dom";
import { usePokemon } from "../context/usePokemon";
import { useEffect, useState } from "react";

type BasePokemon = {
  name: string;
  level: number;
  xp: number;
  captureLevel: number;
  captured: boolean;
};

const PokemonCataloge = () => {
  const { state } = usePokemon();
  const [pokemonBaseList, setPokemonBaseList] = useState<BasePokemon[]>([]);
  const [pokemonFilteredList, setPokemonFilteredList] = useState<BasePokemon[]>(
    [],
  );
  const [captureLevels, setCaptureLevels] = useState([
    { level: "fácil", color: "bg-green-300", selected: false },
    { level: "médio", color: "bg-yellow-300", selected: false },
    { level: "dificil", color: "bg-red-400", selected: false },
    { level: "insano", color: "bg-purple-400", selected: false },
    { level: "todos", color: "bg-white", selected: false },
  ]);

  const isEvolutionChainCaptured = async (speciesUrl: string) => {
    const speciesRes = await fetch(speciesUrl);
    const speciesData = await speciesRes.json();

    const chainRes = await fetch(speciesData.evolution_chain.url);
    const chainData = await chainRes.json();

    const extractNames = (node: any, acc: string[] = []) => {
      acc.push(node.species.name);
      node.evolves_to.forEach((e: any) => extractNames(e, acc));
      return acc;
    };

    const evolutionNames = extractNames(chainData.chain);

    return state.myPokemons.some((p) => evolutionNames.includes(p.name));
  };

  const getPokemonList = async () => {
    try {
      const genRes = await fetch("https://pokeapi.co/api/v2/generation/1");
      const genData = await genRes.json();

      const basePokemons = await Promise.all(
        genData.pokemon_species.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const species = await res.json();

          if (species.evolves_from_species !== null) {
            return null;
          }

          const captured = await isEvolutionChainCaptured(pokemon.url);

          return {
            name: pokemon.name,
            level: 0,
            xp: 0,
            captureLevel: species.capture_rate,
            captured,
          };
        }),
      );

      setPokemonBaseList(basePokemons.filter(Boolean));
      setPokemonFilteredList(basePokemons.filter(Boolean));
    } catch (error) {
      console.log("Cannot get pokemon list", error);
    }
  };
  useEffect(() => {
    getPokemonList();
  }, []);

  const filterCaptureLevel = (captureStatus: string) => {
    if (captureStatus === "fácil") {
      return pokemonBaseList?.filter((pokemon) => pokemon.captureLevel === 255);
    } else if (captureStatus === "médio") {
      return pokemonBaseList?.filter(
        (pokemon) => pokemon.captureLevel < 255 && pokemon.captureLevel >= 190,
      );
    } else if (captureStatus === "dificil") {
      return pokemonBaseList?.filter(
        (pokemon) => pokemon.captureLevel < 190 && pokemon.captureLevel >= 35,
      );
    } else if (captureStatus === "insano") {
      return pokemonBaseList?.filter((pokemon) => pokemon.captureLevel < 35);
    } else {
      return pokemonBaseList;
    }
  };

  const handleSelectLevel = (captureStatus: string) => {
    const newPokemonList = filterCaptureLevel(captureStatus);
    setPokemonFilteredList(newPokemonList);

    const newCaptureLevel = captureLevels.map((item) => 
      item.level === captureStatus
        ? {...item, selected : true}
        : {...item, selected : false}
    );

    setCaptureLevels(newCaptureLevel)
  };

  return (
    <>
      <header className="relative w-full h-fit text-white">
        <section>
          <div className="absolute flex items-end gap-2 top-4 left-4">
            <Link to="/home" className="text-sm  font-bold opacity-70">
              Pokegym
            </Link>
          </div>
          <div className="absolute flex items-end gap-2 top-4 right-4">
            <div className="flex items-end gap-1">
              <span className="text-sm font-bold opacity-70">
                x {state.userStatus.pokeball}{" "}
              </span>
              <img src={pokebola} alt="pokebola" width={28} />
            </div>
            <div className="flex items-end gap-1">
              <span className="text-sm font-bold opacity-70">
                x {state.userStatus.energy}{" "}
              </span>
              <img src={energy} alt="energy" width={28} />
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col gap-2 items-center justify-center pt-12 max-w-150 max-lg:max-w-120 px-4">
            <h1 className="text-2xl text-center font-extrabold">Pokedex</h1>
            <p className="text-sm font-medium text-center opacity-70">
              1. Os pokémons são separados em níveis de captura.
            </p>
            <p className="text-sm font-medium text-center opacity-70">
              2. Cada nível determina o grau de dificudade da batalha.
            </p>
            <p className="text-sm font-medium text-center opacity-70">
              3. Escolha um dos níveis e filtre os pokémons por nível de
              captura.
            </p>
            <p className="text-sm font-medium text-center mb-4 opacity-70">
              4. Ao capturar um pokémon você ganha energia proporcional ao nível.
            </p>
            <h1 className="text-xl text-center font-extrabold">
              Níveis de captura
            </h1>
          </div>
          <ul className="flex gap-2 py-4">
            {captureLevels.map((item, index) => (
              <li
                className={`flex items-center justify-center h-6 w-14 rounded-3xl ${item.color} font-bold text-xs text-black cursor-pointer ${item.selected ? "border-2 border-white bg-transparent! text-white" : "border-none"}`}
                onClick={() => handleSelectLevel(item.level)}
                key={index}
              >
                {item.level}
              </li>
            ))}
          </ul>
        </section>
        <hr className="opacity-40" />
      </header>
      <main className="flex flex-col items-center justify-center h-[calc(100vh-233px)] max-lg:h-full max-lg:min-h-100 text-white">
        <section className="flex flex-col gap-8 items-center justify-center px-4 py-8 h-full">
          <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4 items-center justify-center text-xl h-full max-w-300 m-auto">
            {pokemonFilteredList.map((pokemon, index) => (
              <PokemonCard
                key={index}
                name={pokemon.name}
                buttonText={pokemon.captured ? "capturado" : "capturar"}
                level={0}
                buttonPath={
                  pokemon.captured ? "" : `/pokemon-battle/${pokemon.name}`
                }
                inactive={false}
                buttonStyle={
                  pokemon.captured
                    ? "pointer-events-none! bg-bt-purple! text-white"
                    : ""
                }
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default PokemonCataloge;
