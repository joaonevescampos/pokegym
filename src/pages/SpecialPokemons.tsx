import { usePokemon } from "@/context/usePokemon";
import diamond from "../assets/diamond.png";
import xIcon from "../assets/x.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import Header from "@/components/Header";
import backgroundImage from "../assets/menu-folders/special.png";

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
    hability: "Sortear uma tarefa que ainda não concluiu.",
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
  const { state, useDiamond, activeNote, activeRandom, activePomodoro } =
    usePokemon();
  const [alert, setAlert] = useState(false);
  const [successAlert, setSucessAlert] = useState(false);
  const [pokemonInvocated, setPokemonInvocaated] = useState("");

  const [activePokemon, setActivePokemon] = useState<ActivePokemon[]>([
    { name: "snorlax", active: state.userStatus.snorlaxStatus },
    { name: "victini", active: state.userStatus.victiniStatus },
    { name: "celebi", active: state.userStatus.celebiStatus },
  ]);
  const navigate = useNavigate();

  const involquePokemon = (name: string, cost: number) => {
    if (state.userStatus.diamond < cost) {
      setAlert(true);
    } else {
      useDiamond(cost);
      const updateActivePokemon: ActivePokemon[] = activePokemon.map(
        (pokemon) => {
          if (pokemon.name === name) {
            name === "snorlax" && activeNote(true);
            name === "victini" && activeRandom(true);
            name === "celebi" && activePomodoro(true);
            return { name, active: true };
          }
          return pokemon;
        },
      );
      setActivePokemon(updateActivePokemon);
      setSucessAlert(true);
      setPokemonInvocaated(name);
    }
  };
  return (
    <>
      <Header />
      <img
        src={backgroundImage}
        alt="home"
        className="absolute left-0 w-full object-cover h-full opacity-15 z-0"
      />
      <main className="relative flex flex-col items-center justify-center w-full h-full pb-4 pt-30 z-10">
        <h1 className="text-white text-xl font-bold pb-4 ">
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
          {specialPokemons.map((pokemon, index) => (
            <section
              className={`flex justify-between gap-4 items-center w-full max-w-120 h-52 rounded-2xl p-4 ${pokemon.color}`}
              key={index}
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
                  (item, index) =>
                    pokemon.name === item.name &&
                    (item.active ? (
                      <Button
                        text="Invocado"
                        onClick={() => {
                          pokemon.name === "snorlax" &&
                            navigate("/snorlax-note");
                          pokemon.name === "celebi" && navigate("/pomodoro");
                        }}
                        style="text-white! bg-bt-purple!"
                        key={index}
                      />
                    ) : (
                      <button
                        className="flex gap-1 items-center justify-center bg-white rounded-3xl w-24 py-2 cursor-pointer"
                        onClick={() =>
                          involquePokemon(pokemon.name, pokemon.cost)
                        }
                        key={index}
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
        {successAlert && (
          <div className="absolute h-full w-full top-0 left-0 bg-[#000000d3] z-20">
            <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-1/2 z-30 w-full max-w-100 max-lg:max-w-72 h-fit bg-gray-900 text-white px-4 py-8 rounded-2xl">
              <span
                className="absolute top-2 right-2 cursor-pointer
              "
                onClick={() => setSucessAlert(false)}
              >
                <img src={xIcon} alt="x" className="w-4" />
              </span>
              <img
                src={
                  pokemonInvocated === "snorlax"
                    ? specialPokemons[0].image
                    : pokemonInvocated === "victini"
                      ? specialPokemons[1].image
                      : specialPokemons[2].image
                }
                alt="pokemon"
                className="w-32 mx-auto"
              />
              <h1 className="font-bold text-xl text-center text-green-500">
                Parabéns, você acaba de invocar as habilidades do{" "}
                {pokemonInvocated}!
              </h1>
              {pokemonInvocated === "snorlax" ? (
                <p className="text-sm text-center">
                  Com a habilidade do SNORLAX liberada, você pode agora criar
                  bloco de notas, tanto quando for treinar um pokémon, quanto
                  poderá acessar o bloco clicando no botão "Invocado".
                </p>
              ) : pokemonInvocated === "victini" ? (
                <p className="text-sm text-center">
                  Com a habilidade do VICTINI liberada, você pode sortear
                  tarefas quando for treinar um pokémon e perder totalmente a
                  dúvida de por qual tarefa começar! Essa habilidade só funciona
                  quando for treinar um pokémon específico!
                </p>
              ) : (
                <p className="text-sm text-center">
                  Com a habilidade do CELEBI liberada, você pode agora criar
                  pomodoro que é uma ténica de cronometragem de tarefas e vai te
                  ajudar a concluir tarefas de maneira mais controlada e rápida.
                  Você consegue acessar sua habilidade clicando em "Invocado" ou
                  clicando em "Pomodoro" quando for treinar seu pokémon .
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default SpecialPokemons;
