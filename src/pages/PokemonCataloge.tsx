import PokemonCard from "../components/PokemonCard";
import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import diamond from "../assets/diamond.png";
import maleProfile from "../assets/male-profile.png";
import femaleProfile from "../assets/female-profile.png";

import { Link } from "react-router-dom";
import { usePokemon } from "../context/usePokemon";
import { useEffect, useState } from "react";

type BasePokemon = {
  name: string;
  level: number;
  hp: number;
  captureLevel: number;
  captured: boolean;
};

type Generation = {
  generationString: string;
  generationNumber: number;
  color: string;
  selected: boolean;
  released: boolean;
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
  const [generationList, setGenerationList] = useState<Generation[]>([
    {
      generationString: "I",
      generationNumber: 1,
      color: "bg-green-200",
      selected: true,
      released: true,
    },
    {
      generationString: "II",
      generationNumber: 2,
      color: "bg-blue-200",
      selected: false,
      released: false,
    },
    {
      generationString: "III",
      generationNumber: 3,
      color: "bg-purple-200",
      selected: false,
      released: false,
    },
    {
      generationString: "IV",
      generationNumber: 4,
      color: "bg-pink-200",
      selected: false,
      released: false,
    },
    {
      generationString: "V",
      generationNumber: 5,
      color: "bg-red-200",
      selected: false,
      released: false,
    },
    {
      generationString: "VI",
      generationNumber: 6,
      color: "bg-orange-200",
      selected: false,
      released: false,
    },
    {
      generationString: "VII",
      generationNumber: 7,
      color: "bg-yellow-200",
      selected: false,
      released: false,
    },
    {
      generationString: "VIII",
      generationNumber: 8,
      color: "bg-white",
      selected: false,
      released: false,
    },
    {
      generationString: "IX",
      generationNumber: 9,
      color: "bg-gray-200",
      selected: false,
      released: false,
    },
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

  const getPokemonList = async (generation: number) => {
    try {
      console.log("GEN", generation);
      const genRes = await fetch(
        `https://pokeapi.co/api/v2/generation/${generation}`,
      );
      console.log(`https://pokeapi.co/api/v2/generation/${generation}`);
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
            hp: 0,
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
    getPokemonList(1);
    const userXP = state.userStatus.xp;
    if (userXP >= 0 && userXP < 1000) {
      const newGenerationList: Generation[] = generationList.map((item) =>
        item.generationNumber === 1
          ? { ...item, released: true }
          : { ...item, released: false },
      );
      setGenerationList(newGenerationList);
    } else if (userXP >= 1000 && userXP < 2000) {
      const newGenerationList: Generation[] = generationList.map((item) =>
        item.generationNumber === 1 || item.generationNumber === 2
          ? { ...item, released: true }
          : { ...item, released: false },
      );
      setGenerationList(newGenerationList);
    } else if (userXP >= 2000 && userXP < 3000) {
      const newGenerationList: Generation[] = generationList.map((item) =>
        item.generationNumber === 1 ||
        item.generationNumber === 2 ||
        item.generationNumber === 3
          ? { ...item, released: true }
          : { ...item, released: false },
      );
      setGenerationList(newGenerationList);
    } else if (userXP >= 3000 && userXP < 4000) {
      const newGenerationList: Generation[] = generationList.map((item) =>
        item.generationNumber === 1 ||
        item.generationNumber === 2 ||
        item.generationNumber === 3 ||
        item.generationNumber === 4
          ? { ...item, released: true }
          : { ...item, released: false },
      );
      setGenerationList(newGenerationList);
    } else if (userXP >= 4000 && userXP < 5000) {
      const newGenerationList: Generation[] = generationList.map((item) =>
        item.generationNumber === 6 ||
        item.generationNumber === 7 ||
        item.generationNumber === 8 ||
        item.generationNumber === 9
          ? { ...item, released: false }
          : { ...item, released: true },
      );
      setGenerationList(newGenerationList);
    } else if (userXP >= 5000 && userXP < 6000) {
      const newGenerationList: Generation[] = generationList.map((item) =>
        item.generationNumber === 7 ||
        item.generationNumber === 8 ||
        item.generationNumber === 9
          ? { ...item, released: false }
          : { ...item, released: true },
      );
      setGenerationList(newGenerationList);
    } else if (userXP >= 6000 && userXP < 7000) {
      const newGenerationList: Generation[] = generationList.map((item) =>
        item.generationNumber === 8 || item.generationNumber === 9
          ? { ...item, released: false }
          : { ...item, released: true },
      );
      setGenerationList(newGenerationList);
    } else if (userXP >= 7000 && userXP < 8000) {
      const newGenerationList: Generation[] = generationList.map((item) =>
        item.generationNumber === 9
          ? { ...item, released: false }
          : { ...item, released: true },
      );
      setGenerationList(newGenerationList);
    } else {
      const newGenerationList: Generation[] = generationList.map((item) => {
        return { ...item, released: true };
      });
      setGenerationList(newGenerationList);
    }
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
        ? { ...item, selected: true }
        : { ...item, selected: false },
    );

    setCaptureLevels(newCaptureLevel);
  };

  const handleSelectGeneration = (generation: number) => {
    const newGenerationList: Generation[] = generationList.map((item) =>
      item.generationNumber === generation
        ? { ...item, selected: true }
        : { ...item, selected: false },
    );
    setGenerationList(newGenerationList);
    getPokemonList(generation);
  };

  return (
    <>
      <header className="relative w-full h-fit text-white pt-4">
        <section>
          <div className="absolute flex items-end gap-2 top-4 left-4">
            <Link to="/home" className="text-sm  font-bold opacity-70">
              Pokegym
            </Link>
          </div>
          <section className="absolute flex flex-col items-end gap-2 top-4 right-4">
            <div className="flex gap-4 items-center pb-2">
              <div className="flex items-end gap-2">
                <div className="flex items-end gap-1">
                  <span className="text-sm font-bold opacity-70">
                    x {state.userStatus.pokeball}{" "}
                  </span>
                  <img src={pokebola} alt="pokebola" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-sm font-bold opacity-70">
                    x {state.userStatus.energy}{" "}
                  </span>
                  <img src={energy} alt="energy" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-sm font-bold opacity-70">
                    x {state.userStatus.diamond}{" "}
                  </span>
                  <img src={diamond} alt="diamond" width={20} />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col items-end">
                  <span className="font-bold text-xs">
                    {state.userStatus.userName}
                  </span>
                  <span className="opacity-60 font-bold text-xs">
                    {" "}
                    {state.userStatus.xp} XP
                  </span>
                </div>
                <img
                  src={
                    state.userStatus.gender === "feminino"
                      ? femaleProfile
                      : maleProfile
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>
          </section>
          <div className="absolute flex flex-col items-end gap-2 top-4 right-4"></div>
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
              3. Filtre os pokémons por nível de captura.
            </p>
            <Link to="/">
              <p className="text-sm underline font-medium text-center mb-4">
                Saber mais detalhes
              </p>
            </Link>
          </div>
          <h2 className="text-xl text-center font-extrabold">Geração</h2>
          <p className="text-sm font-medium text-center pt-2 opacity-70">
            Cada geração é liberada a cada 1000 XP do jogador.
          </p>
          <ul className="flex flex-wrap gap-2 py-4 max-lg:max-w-80">
            {generationList.map((item, index) => (
              <li
                className={`flex items-center justify-center h-6 w-14 rounded-3xl ${item.color} font-bold text-xs text-black cursor-pointer ${item.selected ? "border-2 border-white bg-transparent! text-white" : "border-none"} ${!item.released ? "pointer-events-none opacity-50" : ""}`}
                onClick={() => handleSelectGeneration(item.generationNumber)}
                key={index}
              >
                {item.generationString}
              </li>
            ))}
          </ul>
          <h2 className="text-xl text-center font-extrabold">
            Níveis de captura
          </h2>
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
