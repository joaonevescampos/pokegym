import { usePokemon } from "@/context/usePokemon";
import diamond from "../assets/diamond.png";
import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import { Link } from "react-router-dom";

const specialPokemons = [
  {
    name: "snorlax",
    hability: "criação de bloco de notas.",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/143.png",
    cost: 1,
    color: "bg-linear-to-br from-blue-900 to-blue-400",
  },
  {
    name: "victini",
    hability: "Sortear números ou nomes.",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/494.png",
    cost: 5,
    color: "bg-linear-to-br from-orange-900 to-orange-400",
  },
  {
    name: "celebi",
    hability: "cronometrar tarefa com tempo de descanso (pomodoro).",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/251.png",
    cost: 10,
    color: "bg-linear-to-br from-green-900 to-green-400",
  },
];

const SpecialPokemons = () => {
  const { state } = usePokemon();
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
        <h2 className="text-white text-sm text-center opacity-70 max-w-150 px-4">
          Os pokemons especiais não são capturáveis nem treináveis. Você pode
          ter acesso vitalício sem tempo de recuperação à suas habilidades,
          invocando-os com diamante.
        </h2>
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
                <button className="flex gap-1 items-center justify-center bg-white rounded-3xl w-24 py-2 cursor-pointer">
                  <span className="font-bold">x {pokemon.cost}</span>
                  <img src={diamond} alt="diamond" className="w-6" />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
};

export default SpecialPokemons;
