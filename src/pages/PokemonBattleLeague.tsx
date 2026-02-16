import normalArena1 from "../assets/arenas/normal-arena.png";
import grassArena2 from "../assets/arenas/grass-arena2.png";
import psychicArena from "../assets/arenas/psychic-arena.png";
import cassinoArena from "../assets/arenas/cassino-arena.png";
import rockArena from "../assets/arenas/rock-arena2.png";
import finalArena from "../assets/arenas/final-arena.png";
import eliteFourArena from "../assets/arenas/elite-four-arena.png";
import waterArena from "../assets/gym/gym-5.png";
import circleArena from "../assets/arenas/circle-arena.png";

import grassAttack from "../assets/grass-attack.png";
import fireAttack from "../assets/fire-attack.png";
import iceAttack from "../assets/ice-attack.png";
import waterAttack from "../assets/water-attack.png";
import rockAttack from "../assets/rock-attack.png";
import poisonAttack from "../assets/poison-attack.png";
import psychicAttack from "../assets/psychic-attack.png";
import thunderAttack from "../assets/thunder-attack.png";
import genericAttack from "../assets/generic-attack.png";

import pokebola from "../assets/pokeball.png";
import diamond from "../assets/diamond.png";
import xIcon from "../assets/x.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { usePokemon } from "../context/usePokemon";
import Button from "../components/Button";
import type { Pokemon } from "@/context/pokemonTypes";
import { trainers } from "../data/trainers";

const PokemonBattleLeague = () => {
  const { state, useToken, gainPokeball, gainDiamond } = usePokemon();
  const [wonBattle, setWonBattle] = useState<boolean | undefined>(undefined);
  const [delay, setDelay] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isFighting, setIsFighting] = useState(true);
  const [attacker, setAttacker] = useState<"top" | "bottom">("top");
  const [round, setRound] = useState<number>(0);
  const [hasCalculated] = useState(false);
  const [myPokemonWinners, setMyPokemonWinners] = useState<(null | boolean)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [oponnentPokemonWinners, setOponnentPokemonWinners] = useState<
    (null | boolean)[]
  >([null, null, null, null, null]);
  const [oponnentPokemonsCaptureRate, setOponnentPokemonsCaptureRate] =
    useState<number[]>([]);
  const [myPokemonsName, setMyPokemonsName] = useState<string[]>([]);
  const [myPokemonsInfos, setMyPokemonsInfos] = useState<Pokemon[]>([]);
  const navigate = useNavigate();
  const param = useParams();
  const pokemonsOponnentId = param.oponnentPokemons;
  const myPokemonsId = param?.myPokemons;
  const oponnentName = param?.oponnentName;
  const hasRun = useRef(false);
  const myPokemonsIdArray = myPokemonsId?.split("&").map(Number);
  const trainerChoosed = trainers.find(
    (trainer) => trainer.name === oponnentName,
  );

  const oponnentPokemonsIdArray = pokemonsOponnentId?.split("&").map(Number);
  const myPokemonsImages = myPokemonsIdArray?.map((id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  });
  const oponnentPokemonsImages = oponnentPokemonsIdArray?.map((id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  });

  const getSafeIndex = (arr: (boolean | null)[], fallback = 0) => {
    const index = arr.findIndex((v) => v === true || v === null);
    return index >= 0 ? index : fallback;
  };
  const myActiveIndex = getSafeIndex(myPokemonWinners);
  const oponnentActiveIndex = getSafeIndex(oponnentPokemonWinners);
  const myActive = myPokemonWinners[round] === false ? round : myActiveIndex;
  const mySafeIndex = myActive >= 0 && myActive < 5 ? myActive : 0;

  const oponnentActive =
    oponnentPokemonWinners[round] === false ? round : oponnentActiveIndex;
  const oponnentSafeIndex =
    oponnentActive >= 0 && oponnentActive < 5 ? oponnentActive : 0;

  const getPokemonsInfos = async () => {
    let names: string[] = [];
    let captureRates: number[] = [];
    try {
      oponnentPokemonsIdArray?.forEach(async (pokemonId) => {
        const responseCaptureRate: any = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
        );
        const data1 = await responseCaptureRate.json();

        captureRates = [...captureRates, data1.capture_rate];

        setOponnentPokemonsCaptureRate(captureRates);
      });

      myPokemonsIdArray?.forEach(async (pokemonId) => {
        const responseCaptureRate: any = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
        );
        const data2 = await responseCaptureRate.json();
        names = [...names, data2.name];
        setMyPokemonsName(names);
      });
    } catch (error) {
      console.log("Cannot get the pokemon oponent and your pokemon.", error);
    }
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (trainerChoosed) {
      if (state.userStatus.token < trainerChoosed?.cost) {
        navigate("/pokemon-league");
      } else {
        useToken(trainerChoosed?.cost);
      }
    } else {
      navigate("/pokemon-league");
    }
  }, []);

  useEffect(() => {
    const myPokemons =
      myPokemonsName?.flatMap((pokemonName) => {
        const pokemonInfo = state.myPokemons.find(
          (pokemon) => pokemon.name === pokemonName,
        );
        return pokemonInfo ? [pokemonInfo] : [];
      }) ?? [];

    setMyPokemonsInfos(myPokemons);
  }, [myPokemonsName, state.myPokemons]);

  useEffect(() => {
    getPokemonsInfos();

    const interval = setInterval(() => {
      setAttacker((prev) => (prev === "top" ? "bottom" : "top"));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (round < 4) {
        setRound(round + 1);
      } else {
        setIsFighting(false);
      }
    }, 6500);

    return () => clearTimeout(timer);
  }, [round]);

  const simulateBattle = () => {
    let my = [...myPokemonWinners];
    let opponent = [...oponnentPokemonWinners];

    trainers.forEach((trainer) => {
      if (trainer.name === oponnentName) {
        while (true) {
          const myIndex = my.findIndex((v) => v !== false);
          const opponentIndex = opponent.findIndex((v) => v !== false);

          if (myIndex < 0 || opponentIndex < 0) break;

          if (
            myIndex >= myPokemonsInfos.length ||
            opponentIndex >= oponnentPokemonsCaptureRate.length
          )
            break;

          const myPower = myPokemonsInfos[myIndex].hp;
          const opponentPower =
            100 - (oponnentPokemonsCaptureRate[opponentIndex] * 100) / 255;

          const random = Math.random() * 100;

          const iWin =
            myPower >= opponentPower
              ? random < trainer.winRate
              : random < trainer.loseRate;

          if (iWin) {
            my[myIndex] = true;
            opponent[opponentIndex] = false;
          } else {
            my[myIndex] = false;
            opponent[opponentIndex] = true;
          }
        }
      }
    });

    setMyPokemonWinners(my);
    setOponnentPokemonWinners(opponent);
    const everyIsFalse = my.every((item) => item === false);
    everyIsFalse ? setWonBattle(false) : setWonBattle(true);
    console.log(my, opponent);
  };

  useEffect(() => {
    if (wonBattle && trainerChoosed) {
      gainPokeball(trainerChoosed?.rewards.pokeballs);
      if (trainerChoosed?.rewards.diamond) {
        gainDiamond(trainerChoosed?.rewards.diamond);
      }
    }
  }, [wonBattle]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelay(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 32500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (delay && !hasCalculated) {
      simulateBattle();
    }
  }, [delay]);

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen max-lg:h-full max-lg:min-h-100 text-white">
        <section className="relative w-full h-screen">
          <img
            src={
              oponnentName === "brock"
                ? rockArena
                : oponnentName === "misty"
                  ? waterArena
                  : oponnentName === "surge"
                    ? cassinoArena
                    : oponnentName === "erika"
                      ? grassArena2
                      : oponnentName === "koga"
                        ? normalArena1
                        : oponnentName === "sabrina"
                          ? psychicArena
                          : oponnentName === "blaine"
                            ? circleArena
                            : oponnentName === "giovanni"
                              ? normalArena1
                              : oponnentName === "gary"
                                ? finalArena
                                : eliteFourArena
            }
            alt="enviroment"
            className="absolute w-full h-full z-0 object-cover opacity-80"
          />
          {oponnentPokemonsImages && (
            <img
              src={oponnentPokemonsImages[oponnentSafeIndex]}
              alt="pokemon"
              className={`absolute left-1/2 top-3/8 w-40 h-40 -translate-1/2 z-0 ${
                isFighting
                  ? attacker === "top"
                    ? "animate-attack-down"
                    : "animate-hit-right"
                  : ""
              }`}
            />
          )}
          {attacker === "top" && isFighting && (
            <span className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-30 text-white font-bold">
              AAAARRRGG!! NHAC!
            </span>
          )}
          {attacker === "bottom" && isFighting && (
            <span className="absolute left-1/2 bottom-55 -translate-x-1/2 translate-y-30 text-white font-bold">
              Whooshh!! GRRRRR!
            </span>
          )}
          {attacker === "top" && isFighting && (
            <img
              src={
                trainerChoosed?.pokemons[oponnentSafeIndex]?.type === "grass"
                  ? grassAttack
                  : trainerChoosed?.pokemons[oponnentSafeIndex]?.type ===
                      "water"
                    ? waterAttack
                    : trainerChoosed?.pokemons[oponnentSafeIndex]?.type ===
                        "ice"
                      ? iceAttack
                      : trainerChoosed?.pokemons[oponnentSafeIndex]?.type ===
                          "fire"
                        ? fireAttack
                        : trainerChoosed?.pokemons[oponnentSafeIndex]?.type ===
                              "rock" ||
                            trainerChoosed?.pokemons[oponnentSafeIndex]
                              ?.type === "ground"
                          ? rockAttack
                          : trainerChoosed?.pokemons[oponnentSafeIndex]
                                ?.type === "bug" ||
                              trainerChoosed?.pokemons[oponnentSafeIndex]
                                ?.type === "poison"
                            ? poisonAttack
                            : trainerChoosed?.pokemons[oponnentSafeIndex]
                                  ?.type === "psychic" ||
                                trainerChoosed?.pokemons[oponnentSafeIndex]
                                  ?.type === "ghost"
                              ? psychicAttack
                              : trainerChoosed?.pokemons[oponnentSafeIndex]
                                    ?.type === "electric"
                                ? thunderAttack
                                : genericAttack
              }
              alt="attack"
              className={`absolute left-1/2 top-1/2 -translate-1/2 w-28 animate-power-attack-down opacity-0`}
            />
          )}
          {attacker === "bottom" && isFighting && (
            <img
              src={
                myPokemonsInfos[mySafeIndex]?.type === "grass"
                  ? grassAttack
                  : myPokemonsInfos[mySafeIndex]?.type === "water"
                    ? waterAttack
                    : myPokemonsInfos[mySafeIndex]?.type === "ice"
                      ? iceAttack
                      : myPokemonsInfos[mySafeIndex]?.type === "fire"
                        ? fireAttack
                        : myPokemonsInfos[mySafeIndex]?.type === "rock" ||
                            myPokemonsInfos[mySafeIndex]?.type === "ground"
                          ? rockAttack
                          : myPokemonsInfos[mySafeIndex]?.type === "bug" ||
                              myPokemonsInfos[mySafeIndex]?.type === "poison"
                            ? poisonAttack
                            : myPokemonsInfos[mySafeIndex]?.type ===
                                  "psychic" ||
                                myPokemonsInfos[mySafeIndex]?.type === "ghost"
                              ? psychicAttack
                              : myPokemonsInfos[mySafeIndex]?.type ===
                                  "electric"
                                ? thunderAttack
                                : genericAttack
              }
              alt="attack"
              className={`absolute left-1/2 bottom-40 -translate-x-1/2 w-28 animate-power-attack-up opacity-0`}
            />
          )}

          {myPokemonsImages && (
            <img
              src={myPokemonsImages[mySafeIndex]}
              alt="pokemon"
              className={`absolute left-1/2 bottom-10 w-48 h-48 -translate-1/2 z-0 ${
                isFighting
                  ? attacker === "top"
                    ? "animate-hit-left"
                    : "animate-attack-up"
                  : ""
              }`}
            />
          )}

          <div className="absolute left-1/2 bottom-10 flex gap-2 w-68 -translate-x-1/2 z-0">
            {myPokemonsImages?.map((pokemon, index) => (
              <div className="relative">
                <img
                  src={pokemon}
                  alt="pokemon"
                  className="w-12 h-12 bg-gray-800 rounded-xl p-1"
                />
                {round >= index + 1 && myPokemonWinners[index] === false && (
                  <img
                    src={xIcon}
                    alt="close icon"
                    className="absolute w-8 h-8 left-1/2 top-1/2 -translate-1/2"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="absolute left-1/2 top-10 flex gap-2 w-68 -translate-x-1/2 z-0">
            {oponnentPokemonsImages?.map((pokemon, index) => (
              <div className="relative">
                <img
                  src={pokemon}
                  alt="pokemon"
                  className="w-12 h-12 bg-gray-800 rounded-xl p-1"
                />
                {round >= index + 1 &&
                  oponnentPokemonWinners[index] === false && (
                    <img
                      src={xIcon}
                      alt="close icon"
                      className="absolute w-8 h-8 left-1/2 top-1/2 -translate-1/2"
                    />
                  )}
              </div>
            ))}
          </div>

          {wonBattle === true && showResult && (
            <div className="absolute flex flex-col gap-4 items-center justify-center w-full h-full bg-[#000000b2] z-10 px-4">
              <img
                src={trainerChoosed?.image}
                alt="pokemon"
                className={`h-52 z-20 mb-4`}
              />

              <h1 className="text-2xl font-bold top-8 text-center z-50 text-green-400">
                Parabéns! Você ganhou do {oponnentName?.toUpperCase()}!
              </h1>
              <div className="flex gap-2 items-center">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-center font-bold font-white">
                    Você ganhou +{trainerChoosed?.rewards.pokeballs}
                  </p>
                  <img src={pokebola} alt="pokeball" className="w-6" />
                </div>
                {trainerChoosed?.rewards?.diamond && (
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-center font-bold font-white">
                      +{trainerChoosed?.rewards.diamond}
                    </p>
                    <img src={diamond} alt="diamond" className="w-6" />
                  </div>
                )}
              </div>
              <p className="text-sm top-32 text-center ">
                Você é fera! Aproveite suas recompensas!
              </p>
              <Button text="Sair" path="/pokemon-league" />
            </div>
          )}

          {wonBattle === false && showResult && (
            <div className="absolute flex flex-col gap-4 items-center justify-center w-full h-full bg-[#000000b2] z-10 px-4">
              <img
                src={trainerChoosed?.image}
                alt="pokemon"
                className={`h-52 z-20 mb-4`}
              />
              <h1 className="text-2xl font-bold top-8 text-center z-50 text-red-400">
                Que pena! Você foi derrotado por {oponnentName?.toUpperCase()}
              </h1>
              <p className="text-xl font-bold top-32 text-center">
                Que luta dificil!
              </p>
              <p className="text-sm top-32 text-center ">
                Continue treinando seu pokemon para ter mais chances de ganhar a
                batalha.
              </p>
              <div className="flex gap-4">
                {state.userStatus.pokeball > 0 && (
                  <Button
                    text="Tentar novamente"
                    onClick={() => {
                      window.location.reload();
                    }}
                  />
                )}
                <Button text="Sair" path="/pokemon-league" />
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default PokemonBattleLeague;
