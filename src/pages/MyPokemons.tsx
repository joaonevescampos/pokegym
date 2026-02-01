import PokemonCard from "../components/PokemonCard";
import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import diamond from "../assets/diamond.png";
import maleProfile from "../assets/male-profile.png";
import femaleProfile from "../assets/female-profile.png";
import { Link } from "react-router-dom";
import { usePokemon } from "../context/usePokemon";
import Button from "@/components/Button";

const MyPokemons = () => {
  const { state } = usePokemon();
  return (
    <>
      <header className="relative w-full h-fit text-white">
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
                  <span className="font-bold text-xs">{state.userStatus.userName}</span>
                  <span className="opacity-60 font-bold text-xs">
                    {" "}
                    {state.userStatus.xp} XP
                  </span>
                </div>
                <img
                  src={state.userStatus.gender=== "feminino" ? femaleProfile : maleProfile}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>
          </section>
        </section>
        <section className="flex items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center justify-center pt-20 max-w-150 max-lg:max-w-120">
            <h1 className="text-2xl text-center font-extrabold">
              Meus Pokémons
            </h1>
          </div>
        </section>
        <section className="flex flex-col items-center gap-2 p-4 text-sm">
          <span className="opacity-70">Pokemons capturados: {state.myPokemons.length}</span>
          <span className="opacity-70">
            Total para serem capturados: {541 - state.myPokemons.length}
          </span>
          <span className="opacity-70">
            Total de pokémon no jogo: {541}
          </span>
          <Button text="Capturar pokemon" path="/capture-pokemon" />
          <hr className="opacity-40 w-full" />
        </section>
      </header>
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
