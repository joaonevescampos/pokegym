import { useEffect, useState } from "react";
import Button from "../components/Button";
import PokemonCard from "../components/PokemonCard";
import { Link, useNavigate } from "react-router-dom";
import { usePokemon } from "../context/usePokemon";

const ChoosePokemon = () => {
  const { capturePokemon } = usePokemon();
  const navigate = useNavigate();
  const [inactive, setinactive] = useState(true);
  const [initialPokemons, setInitialPokemons] = useState([
    {
      name: "pichu",
      type: "electric",
      level: 0,
      hp: 0,
      selected: false,
      rarity: 3,
    },
  ]);
  const { state } = usePokemon();

  useEffect(() => {
    if (state.myPokemons.length > 0) {
      navigate("/home");
    }
  }, []);

  const handleClick = (index: number) => {
    const updateSelection = initialPokemons.map((pokemon, i) =>
      index === i
        ? { ...pokemon, selected: true }
        : { ...pokemon, selected: false },
    );
    setInitialPokemons(updateSelection);
  };

  const handleChoosePokemon = () => {
    const pokemonChose = initialPokemons.filter(
      (pokemon) => pokemon.selected,
    )[0];
    capturePokemon(pokemonChose.name, pokemonChose.type, pokemonChose.rarity);
  };

  useEffect(() => {
    const oneSelected: boolean = initialPokemons.some(
      (pokemon) => pokemon.selected === true,
    );
    setinactive(!oneSelected);
  }, [initialPokemons]);

  return (
    <>
      {state.myPokemons.length === 0 && (
        <>
          <header className="relative w-full h-12 text-white">
            <div className="absolute flex items-end gap-2 top-4 left-4">
              <Link
                to="/set-informations"
                className="text-sm  font-bold opacity-70"
              >
                voltar
              </Link>
            </div>
          </header>
          <main className="flex flex-col items-center justify-center h-[calc(100vh-48px)] max-lg:h-full! text-white">
            <div className="flex flex-col gap-4">
              <section className="relative flex items-center justify-center w-full h-full pt-4">
                <div className="flex flex-col gap-4 items-center justify-center p-4 max-w-150 max-lg:max-w-120">
                  <h1 className="text-2xl text-center font-extrabold">
                    Escolha seu pokemon inicial
                  </h1>
                  <p className="text-sm font-medium text-center">
                    Escolha com sabedoria pois é irreversível e este pokémon vai
                    seguir com você por um bom tempo!
                  </p>
                </div>
              </section>
              <section className="flex flex-col gap-8 items-center justify-center px-4 py-8 h-full">
                <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4 items-center justify-center text-xl h-full max-w-300 m-auto">
                  {initialPokemons.map((pokemon, index) => (
                    <PokemonCard
                      key={index}
                      name={pokemon.name}
                      pokemonSelected={pokemon.selected ? pokemon.name : ""}
                      buttonText={`${
                        pokemon.selected ? "selecionado" : "selecionar"
                      }`}
                      buttonClick={() => handleClick(index)}
                      level={pokemon.level}
                      hp={pokemon.hp}
                    />
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center gap-4 mb-16">
                  <Link to="/my-pokemons">
                    <Button
                      text="próximo"
                      inactive={inactive}
                      onClick={() => handleChoosePokemon()}
                    />
                  </Link>
                  {inactive && (
                    <p className="text-red-300 text-sm">
                      Selecione um pokemon para prosseguir!
                    </p>
                  )}
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ChoosePokemon;
