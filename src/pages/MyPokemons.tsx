import PokemonCard from "../components/PokemonCard";
import { usePokemon } from "../context/usePokemon";
import Button from "@/components/Button";
import Header from "@/components/Header";

const MyPokemons = () => {
  const { state } = usePokemon();
  return (
    <>
      <Header />
      <section className="relative w-full h-fit text-white pt-8">
        <section className="flex items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center justify-center pt-20 max-w-150 max-lg:max-w-120">
            <h1 className="text-2xl text-center font-extrabold">
              Meus Pokémons
            </h1>
          </div>
        </section>
        <section className="flex flex-col items-center gap-2 p-4 text-sm">
          <span className="opacity-70">
            Pokemons capturados: {state.myPokemons.length}
          </span>
          <span className="opacity-70">
            Total para serem capturados: {541 - state.myPokemons.length}
          </span>
          <span className="opacity-70">Total de pokémon no jogo: {541}</span>
          <Button text="Capturar pokemon" path="/capture-pokemon" />
        </section>
      </section>
      <main className="flex flex-col items-center justify-center h-[calc(100vh-233px)] max-lg:h-full max-lg:min-h-100 text-white">
        <section className="flex flex-col gap-8 items-center justify-center px-4 py-8 h-full">
          <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4 items-center justify-center text-xl h-full max-w-300 m-auto">
            {state.myPokemons.map((pokemon, index) => (
              <PokemonCard
                key={index}
                name={pokemon.name}
                buttonText="treinar"
                level={pokemon.level}
                buttonPath={`/pokemon/${pokemon.name}`}
                inactive={false}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default MyPokemons;
