import florestImage from "../assets/florest.png";
import rocketTeam from "../assets/team-rocket-3d.png";
import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { usePokemon } from "../context/usePokemon";

const RocketTeamBattle = () => {
  const [myPokemon, setMyPokemon] = useState("");
  const [wonBattle, setWonBattle] = useState<boolean | undefined>(undefined);
  const [showResult, setShowResult] = useState(false);
  const [reward, setReward] = useState("");
  const { gainPokeball, gainEnergy } = usePokemon();
  const [isFighting, setIsFighting] = useState(true);
  const navigate = useNavigate();

  const param = useParams();

  useEffect(() => {
    console.log(
      "teste",
      Number(localStorage.getItem("timer_end_time")) - Date.now(),
    );
    if (
      Number(localStorage.getItem("timer_end_time")) - Date.now() <
      28788000
    ) {
      navigate(`/home`);
    }
  }, []);

  const getPokemonImage = async (name: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      setMyPokemon(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
      );
    } catch (error) {
      console.log("cannot get pokemon image");
    }
  };

  const [attacker, setAttacker] = useState<"top" | "bottom">("top");

  useEffect(() => {
    if (param.pokemonName) {
      getPokemonImage(param.pokemonName);
    }

    const interval = setInterval(() => {
      setAttacker((prev) => (prev === "top" ? "bottom" : "top"));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFighting(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  const calculateWinner = async () => {
    const total = 1;
    const randomNumberToWin: number = Math.round(Math.random() * total);
    console.log("randomNumberToWin", randomNumberToWin);
    console.log("randomNumber", Math.round(Math.random()));

    if (randomNumberToWin === 0) {
      setWonBattle(true);
      calculateReward();
    } else {
      setWonBattle(false);
    }
  };

  const calculateReward = async () => {
    const total = 5;
    const randomNumberToWinPokeball: number = Math.round(Math.random() * total);
    console.log("random number", randomNumberToWinPokeball);

    if (randomNumberToWinPokeball === 2) {
      console.log("ganhar pokebola");
      setReward("pokebola");
      gainPokeball(1);
    } else {
      console.log("ganhar energy");
      setReward("energy");
      gainEnergy(1)
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showResult) {
      calculateWinner();
    }
  }, [showResult]);

  return (
    <>
      {Number(localStorage.getItem("timer_end_time")) - Date.now() <
      28708000 ? (
        <></>
      ) : (
        <main className="flex flex-col items-center justify-center h-screen max-lg:h-full max-lg:min-h-100 text-white">
          <section className="relative w-full h-screen">
            <img
              src={florestImage}
              alt="florest"
              className="absolute w-full h-full z-0 object-cover"
            />
            {isFighting && (
              <img
                src={rocketTeam}
                alt=""
                className={`absolute left-1/2 top-3/7 w-60 -translate-1/2 z-0 ${
                  isFighting
                    ? attacker === "top"
                      ? "animate-attack-down"
                      : "animate-hit-right"
                    : ""
                }`}
              />
            )}
            {myPokemon && isFighting && (
              <img
                src={myPokemon}
                alt="florest"
                className={`absolute left-1/2 bottom-0 w-48 h-48 -translate-1/2 z-0 ${
                  isFighting
                    ? attacker === "top"
                      ? "animate-hit-left"
                      : "animate-attack-up"
                    : ""
                }`}
              />
            )}

            {wonBattle === true && showResult && (
              <div className="absolute flex flex-col gap-4 items-center justify-center w-full h-full bg-black opacity-80 z-10 px-4">
                <img
                  src={rocketTeam}
                  alt=""
                  className={`w-36 h-36 z-20 mb-8`}
                />
                <h1 className="text-2xl font-bold top-8 text-center z-50 text-green-400">
                  Parabéns! Você ganhou da equipe Rocket!
                </h1>
                <p className="text-xl font-bold top-32 text-center ">
                  Recompensa:
                </p>

                {reward === "pokebola" ? (
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="flex items-end gap-2 top-4 right-4">
                      <span className="text-sm font-bold opacity-70">+ 1</span>
                      <img src={pokebola} alt="pokebola" width={28} />
                    </div>
                    <p className="text-sm font-semibold top-32 text-center">
                      Que sorte! 🎉 Ganhar uma pokébola não é fácil!
                    </p>
                  </div>
                ) : (
                  <div className="flex items-end gap-2 top-4 right-4">
                    <span className="text-sm font-bold opacity-70">+ 1</span>
                    <img src={energy} alt="energy" width={28} />
                  </div>
                )}

                <p className="text-sm top-32 text-center ">
                  Eles foram embora. Você poderá tentar novamente em 8h.
                </p>
                <Button text="Ver meus pokemon" path="/my-pokemons" />
              </div>
            )}

            {wonBattle === false && showResult && (
              <div className="absolute flex flex-col gap-4 items-center justify-center w-full h-full bg-black opacity-80 z-10 px-4">
                <img
                  src={rocketTeam}
                  alt=""
                  className={`w-36 h-36 z-20 animate-pokemon-scape opacity-0`}
                />
                <h1 className="text-2xl font-bold top-8 text-center z-50 text-red-400">
                  Poxa... Você perdeu!
                </h1>
                <p className="text-xl font-bold top-32 text-center ">
                  A traiçoeira da equipe Rocket só fez você perder tempo!
                </p>
                <p className="text-sm top-32 text-center ">
                  Eles foram embora. Você poderá tentar novamente em 8h.
                </p>
                <Button text="Voltar" path="/home" />
              </div>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default RocketTeamBattle;
