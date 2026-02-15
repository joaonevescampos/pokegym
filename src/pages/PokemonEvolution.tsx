import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import light from "../assets/light.png";
import Button from "../components/Button";
import pokebola from "../assets/pokeball.png";
import token from "../assets/token.png";

const PokemonEvolution = () => {
  const [prevPokemon, setPrevPokemon] = useState("");
  const [evolvedPokemon, setEvolvedPokemon] = useState("");
  const pokemonName = useParams().pokemonName!;
  const [pokemonEvolvedName, setPokemonEvolvedName] = useState("");
  const [isEvolving, setIsEvolving] = useState<boolean>(true);

  function findNextEvolution(chain: any, currentName: string): string | null {
    if (chain.species.name === currentName) {
      return chain.evolves_to?.[0]?.species?.name ?? null;
    }

    for (const evo of chain.evolves_to ?? []) {
      const result = findNextEvolution(evo, currentName);
      if (result) return result;
    }

    return null;
  }

  const getPokemonImages = async (name: string) => {
    console.log(name);
    try {
      const response1 = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
      );
      const data1 = await response1.json();
      setPrevPokemon(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data1.id}.png`,
      );

      const response2 = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${name}`,
      );
      const data2 = await response2.json();

      const evolvesTo = data2.evolution_chain?.url;

      if (!evolvesTo) return;

      const chainResponse = await fetch(evolvesTo);
      const chainData = await chainResponse.json();

      const newName = findNextEvolution(chainData.chain, name);

      if (!newName) return;

      setPokemonEvolvedName(newName);

      const response3 = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${newName}`,
      );
      const data3 = await response3.json();
      setEvolvedPokemon(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data3.id}.png`,
      );
    } catch (error) {
      console.log("cannot get pokemon image");
    }
  };

  const evolving = () => {
    setTimeout(() => {
      setIsEvolving(false);
    }, 10000);
  };

  useEffect(() => {
    getPokemonImages(pokemonName);
    evolving();
  }, []);

  return (
    <main className="h-screen w-full">
      <section className="relative h-full p-4">
        {isEvolving === true ? (
          <>
            <h1 className="text-white text-center px-4 py-4 pb-24 font-bold text-2xl">
              {pokemonName.slice(0, 1).toUpperCase() +
                pokemonName.slice(1, pokemonName.length)}{" "}
              está evoluindo!
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-10 z-12 h-fit">
              <img
                src={light}
                alt="light"
                className={`w-100 opacity-0 ${isEvolving && "animate-pokemon-evolving"}`}
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10 h-fit">
              <img
                src={prevPokemon}
                alt={prevPokemon}
                className="w-52 max-lg:w-42 m-auto animate-desapearing opacity-0"
              />
            </div>
          </>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10 h-fit w-full px-4">
            <img
              src={evolvedPokemon}
              alt={evolvedPokemon}
              className="w-64 m-auto"
            />
            <div className="flex flex-col gap-2 items-center justify-center py-4 text-white text-center w-full">
              <span className="font-bold text-xl">
                {pokemonEvolvedName.toUpperCase()}!
              </span>
              <span className="font-semibold">
                Parabéns, seu {pokemonName.toUpperCase()} evoluiu para{" "}
                {pokemonEvolvedName.toUpperCase()}!
              </span>
              <h1 className="font-bold text-center text-green-400">
                Você ganhou +3 pokebolas, +1 HP, +30 XP e 30 fichas de batalha!
              </h1>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1 top-4 right-4">
                  <span className="text-sm font-bold opacity-70">+ 3</span>
                  <img src={pokebola} alt="pokebola" width={28} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold opacity-70">+ 30</span>
                  <img src={token} alt="token" width={28} />
                </div>
              </div>
              <Button text="Meus pokémons" path="/my-pokemons" />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default PokemonEvolution;
