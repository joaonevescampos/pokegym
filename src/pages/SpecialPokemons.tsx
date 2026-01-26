import { usePokemon } from "@/context/usePokemon";
import diamond from "../assets/diamond.png";
import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import xIcon from "../assets/x.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";

const specialPokemons = [
  {
    name: "snorlax",
    hability: "criação de bloco de notas.",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/143.png",
    cost: 1,
    color: "bg-linear-to-br from-blue-900 to-blue-400",
    active: false,
  },
  {
    name: "victini",
    hability: "Sortear números ou nomes.",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/494.png",
    cost: 5,
    color: "bg-linear-to-br from-orange-900 to-orange-400",
    active: false,
  },
  {
    name: "celebi",
    hability: "cronometrar tarefa com tempo de descanso (pomodoro).",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/251.png",
    cost: 10,
    color: "bg-linear-to-br from-green-900 to-green-400",
    active: false,
  },
];

type ActivePokemon = {
  name: string;
  active: boolean;
};

const SpecialPokemons = () => {
  const { state, useDiamond } = usePokemon();
  const [alert, setAlert] = useState(false);
  const [activePokemon, setActivePokemon] = useState<ActivePokemon[]>([
    { name: "snorlax", active: false },
    { name: "victini", active: false },
    { name: "celebi", active: false },
  ]);

  const involquePokemon = (name: string, cost: number) => {
    if (state.userStatus.diamond < cost) {
      setAlert(true);
    } else {
      useDiamond(cost);
      const updateActivePokemon: ActivePokemon[] = activePokemon.map(
        (pokemon) => {
          if (pokemon.name === name) {
            return { name, active: true };
          }
          return pokemon;
        },
      );
      setActivePokemon(updateActivePokemon);
    }
  };
  return (
    <>
      <div className="absolute flex items-end gap-2 top-4 right-4 text-white">
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
        <div className="flex items-end gap-1">
          <span className="text-sm font-bold opacity-70">
            x {state.userStatus.diamond}{" "}
          </span>
          <img src={diamond} alt="diamond" width={28} />
        </div>
      </div>
      <div className="absolute flex items-end gap-2 top-4 left-4 text-white">
        <Link to="/home" className="text-sm  font-bold opacity-70">
          Pokegym
        </Link>
      </div>
      <main className="flex flex-col items-center justify-center w-full h-full pb-4 pt-16">
        <h1 className="text-white text-xl font-bold pb-4">
          Pokemons Especiais
        </h1>
        <h2 className="text-white text-sm text-center opacity-70 max-w-150 px-4 pb-2">
          Os pokemons especiais não são capturáveis nem treináveis. Você pode
          ter acesso vitalício sem tempo de recuperação à suas habilidades,
          invocando-os com diamante.
        </h2>
        <h3 className="text-white text-sm text-center opacity-70 max-w-150 px-4">
          Treine um pokémon até o level 10 para ganhar 1 diamante
        </h3>
        <div className="flex flex-col gap-4 items-center justify-center w-full p-4">
          {specialPokemons.map((pokemon) => (
            <section
              className={`flex justify-between gap-4 items-center w-full max-w-120 h-52 rounded-2xl p-4 ${pokemon.color}`}
            >
              <div className="flex-2 flex flex-col items-center gap-2 w-60">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-full"
                />
                <span className="text-white text-sm font-bold">
                  {pokemon.name.toUpperCase()}
                </span>
              </div>
              <div className="flex-3 flex flex-col h-full justify-between items-end">
                <span className="text-white text-sm pt-12">
                  <strong>Habilidade: </strong> {pokemon.hability}
                </span>
                {activePokemon.map(
                  (item) =>
                    pokemon.name === item.name &&
                    (item.active ? (
                      <Button text="Selecionar" path={`/special-pokemon/${pokemon.name}`} style="text-white!"/>
                    ) : (
                      <button
                        className="flex gap-1 items-center justify-center bg-white rounded-3xl w-24 py-2 cursor-pointer"
                        onClick={() =>
                          involquePokemon(pokemon.name, pokemon.cost)
                        }
                      >
                        <span className="font-bold">x {pokemon.cost}</span>
                        <img src={diamond} alt="diamond" className="w-6" />
                      </button>
                    )),
                )}
              </div>
            </section>
          ))}
        </div>
        {alert && (
          <div className="absolute h-full w-full top-0 left-0 bg-[#000000d3] z-20">
            <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-1/2 z-30 w-full max-w-100 max-lg:max-w-72 h-fit bg-gray-900 text-white px-4 py-8 rounded-2xl">
              <span
                className="absolute top-2 right-2 cursor-pointer
              "
                onClick={() => setAlert(false)}
              >
                <img src={xIcon} alt="x" className="w-4" />
              </span>
              <h1 className="font-bold text-xl text-center">
                Poxa, você não pode invocar!
              </h1>
              <div className="flex items-center gap-2 top-4 right-4 font-bold">
                <span>Seus diamantes:</span>
                <span className="text-sm font-bold opacity-70">
                  x {state.userStatus.diamond}{" "}
                </span>
                <img src={diamond} alt="diamond" width={28} />
              </div>
              <p className="text-sm text-center">
                Você não tem diamantes suficientes para invocar este pokémon!
                Treine seus pokémons até o nível 10 para ganhar 1 diamante!
                Capture vários pokémon e treine até o nível 10 para ter
                diamantes suficiente.
              </p>
              <Button text="Treinar pokemons" path="/my-pokemons" />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default SpecialPokemons;
