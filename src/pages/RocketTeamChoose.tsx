import PokemonCard from "../components/PokemonCard";
import florestImage from "../assets/florest.png";
import { Link, useNavigate } from "react-router-dom";
import { usePokemon } from "../context/usePokemon";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import rocketTeam from "../assets/team-rocket-3d.png";

const RocketTeamChoose = () => {
  const { state, setTimeToRestRocket } = usePokemon();
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState<
    number | undefined
  >(undefined);
  const navigate = useNavigate();
  const timeToWait = 8 * 60 * 60;

  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const savedEndTime = state.userStatus.time_to_rest_rocket;

    if (savedEndTime) {
      const endTime = Number(savedEndTime);
      updateTime(endTime);

      const interval = setInterval(() => {
        updateTime(endTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  function formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => String(n).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  function startTimer(seconds: number) {
    const endTime = Date.now() + seconds * 1000;
    setTimeToRestRocket(endTime);
    updateTime(endTime);
  }

  function updateTime(endTime: number) {
    const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    setTimeLeft(remaining);

    if (remaining === 0) {
      setTimeToRestRocket(null);
    }
  }

  const selectedPokemon =
    typeof selectedPokemonIndex === "number"
      ? state.myPokemons[selectedPokemonIndex]
      : null;

  const handleClick = (index: number) => {
    setSelectedPokemonIndex(index);
  };

  const startBattle = () => {
    startTimer(timeToWait);
    navigate(`/rocket-team-battle/${selectedPokemon?.name}`);
  };

  return (
    <>
      {timeLeft > 0 ? (
        <main className="flex items-center justify-center h-screen w-full p-4 text-white">
          <div className="flex flex-col items-center justify-center gap-4">
            <strong className="text-xl text-center text-red-400">
              A equipe Rocket não apareceu para a encrenca ainda!
            </strong>
            <strong className="text-sm text-center">
              Espere o tempo acabar para poder batalhar!
            </strong>
            <p className="text-white text-center text-sm opacity-70">
              Tempo restante
            </p>
            <span>{formatTime(timeLeft)}</span>
            <Button text="voltar" path="/home" style="text-white!"></Button>
          </div>
        </main>
      ) : (
        <main className="flex flex-col items-center justify-center h-full max-lg:h-full max-lg:min-h-100 text-white">
          <section className="relative w-full h-72">
            <img
              src={florestImage}
              alt="florest"
              className="absolute w-full h-full z-0 object-cover pointer-events-none"
            />
            <div className="absolute flex items-end gap-2 top-4 left-4">
              <Link to="/home" className="text-sm font-bold ">
                voltar
              </Link>
            </div>
            <img
              src={rocketTeam}
              alt="rocket team"
              className="absolute left-1/2 top-1/2 w-72 -translate-1/2 z-0"
            />
          </section>
          <section className="flex flex-col gap-12 items-center justify-start px-4 py-8 h-full">
            <h1 className="text-white font-bold text-xl text-center">
              Escolha um dos seus pokémons para batalhar contra a equipe Rocket!
            </h1>
            <div className="flex flex-col gap-4 text-center">
              <p className="opacity-50 text-sm text-center">
                Recompensas possíveis: 1 pokebola ou 1 energy
              </p>
              <strong className="text-sm text-center">
                Atenção: Você só poderá batalhar contra a equipe Rocket a cada
                8h.
              </strong>
            </div>
            <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4 items-center justify-center text-xl max-w-300">
              {state.myPokemons.map((pokemon, index) => (
                <PokemonCard
                  key={index}
                  name={pokemon.name}
                  buttonText={`${
                    selectedPokemonIndex === index
                      ? "selecionado"
                      : "selecionar"
                  }`}
                  buttonStyle={`${
                    selectedPokemonIndex === index &&
                    "bg-bt-purple! text-white!"
                  }`}
                  level={pokemon.level}
                  hp={pokemon.hp}
                  inactive={false}
                  buttonClick={() => handleClick(index)}
                />
              ))}
            </div>
          </section>
          {typeof selectedPokemonIndex === "number" ? (
            <Button
              text="Iniciar batalha!"
              style="z-20! mb-24 mt-4"
              onClick={() => startBattle()}
            />
          ) : (
            <div className="h-10"></div>
          )}
        </main>
      )}
    </>
  );
};

export default RocketTeamChoose;
