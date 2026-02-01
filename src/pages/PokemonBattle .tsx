import florestImage from "../assets/florest.png";
import caveImage from "../assets/cave.png";
import rockImage from "../assets/rock-cave.png";
import jungleImage from "../assets/jungle.png";
import lavaImage from "../assets/lava.png";
import ghostImage from "../assets/ghost.png";
import lakeImage from "../assets/lake.png";
import iceImage from "../assets/ice.png";

import grassAttack from "../assets/grass-attack.png";
import fireAttack from "../assets/fire-attack.png";
import iceAttack from "../assets/ice-attack.png";
import waterAttack from "../assets/water-attack.png";
import rockAttack from "../assets/rock-attack.png";
import poisonAttack from "../assets/poison-attack.png";
import psychicAttack from "../assets/psychic-attack.png";
import thunderAttack from "../assets/thunder-attack.png";
import genericAttack from "../assets/generic-attack.png";

import pokeball from "../assets/pokeball-animation.png";
import lightCircle from "../assets/light-circle.png";
import energy from "../assets/energy.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { usePokemon } from "../context/usePokemon";
import Button from "../components/Button";

const PokemonBattle = () => {
  const [pokemonOponent, setPokemonOponent] = useState("");
  const [oponentType, setOponentType] = useState<string>("");
  const [myPokemonType, setMyPokemonType] = useState<string>("");
  const [myPokemon, setMyPokemon] = useState("");
  const { state, capturePokemon, gainEnergy, usePokeball } = usePokemon();
  const [wonBattle, setWonBattle] = useState<boolean | undefined>(undefined);
  const [showResult, setShowResult] = useState(false);
  const [pokemonReward, setPokemonReward] = useState<number>(1);
  const navigate = useNavigate();

  const param = useParams();

  const getPokemonImage = async (name: string, isOponent: boolean) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      if (isOponent) {
        setOponentType(data.types[0].type.name)
        setPokemonOponent(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
        );
      } else {
        setMyPokemonType(data.types[0].type.name)
        setMyPokemon(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
        );
      }
    } catch (error) {
      console.log("cannot get pokemon image");
    }
  };

  const [attacker, setAttacker] = useState<"top" | "bottom">("top");

  useEffect(() => {
    if (param.pokemonOponent) {
      getPokemonImage(param.pokemonOponent, true);
    }

    if (param.pokemonChose) {
      getPokemonImage(param.pokemonChose, false);
    }

    const interval = setInterval(() => {
      setAttacker((prev) => (prev === "top" ? "bottom" : "top"));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [isFighting, setIsFighting] = useState(true);
  const [isCapturing, setIsCapturing] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (state.userStatus.pokeball <= 0) {
      navigate("/capture-pokemon");
    } else {
      usePokeball(1);
    }
  }, []);

  // useEffect(() => {
  //   getOponentType();
  //   getMyPokemonType()
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFighting(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isFighting) {
      const timer = setTimeout(() => {
        setIsCapturing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isFighting]);

  // const getOponentType = async () => {
  //   try {
  //     const responseId = await fetch(
  //       `https://pokeapi.co/api/v2/pokemon/${param.pokemonOponent}`,
  //     );
  //     const data1 = await responseId.json();
  //     const type: string = data1.types[0].type.name;
  //     setOponentType(type);
  //   } catch (error) {
  //     console.log("Cannot get the oponent type.", error);
  //   }
  // };

  //     const getMyPokemonType = async () => {
  //   try {
  //     const responseId = await fetch(
  //       `https://pokeapi.co/api/v2/pokemon/${param.pokemonOponent}`,
  //     );
  //     const data1 = await responseId.json();
  //     const type: string = data1.types[0].type.name;
  //     setMyPokemonType(type);
  //   } catch (error) {
  //     console.log("Cannot get the my pokemon type.", error);
  //   }
  // };

  const calculateWinner = async () => {
    try {
      const responseId = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${param.pokemonOponent}`,
      );
      const data1 = await responseId.json();
      // const type: string = data1.types[0].type.name;

      const responseCaptureRate: any = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${data1.id}`,
      );
      const data2 = await responseCaptureRate.json();

      //calculo de de vitória
      const captureRate = data2.capture_rate;
      const maxCaptureRate = 255;
      const maxLevel = 100;
      const maxPokemons = 541;
      const maxCapturePorcentage = 100;
      const userTotalPokemon = state.myPokemons.length;
      const capturedPorcentage = Math.ceil(
        (userTotalPokemon * 100) / maxPokemons,
      );

      const pokemonChose = state.myPokemons.filter(
        (pokemon) => pokemon.name === param.pokemonChose,
      )[0];
      const pokemonChoseHP = pokemonChose.hp;

      const winRate = captureRate + capturedPorcentage + pokemonChoseHP;
      const total = maxCaptureRate + maxLevel + maxCapturePorcentage;

      const randomNumberToWin: number = Math.ceil(Math.random() * total);

      if (randomNumberToWin <= winRate) {
        setWonBattle(true);
        capturePokemon(param.pokemonOponent!, oponentType);
        if (captureRate <= 3) {
          gainEnergy(50);
          setPokemonReward(50);
        } else if (captureRate > 3 && captureRate <= 45) {
          gainEnergy(10);
          setPokemonReward(10);
        } else if (captureRate > 45 && captureRate <= 190) {
          gainEnergy(3);
          setPokemonReward(3);
        } else {
          gainEnergy(1);
          setPokemonReward(1);
        }
      } else {
        setWonBattle(false);
      }
    } catch (error) {
      console.log("Cannot get the pokemon oponent.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 22000);
    return () => clearTimeout(timer);
  }, []);

  const [hasCalculated, setHasCalculated] = useState(false);

  useEffect(() => {
    if (showResult && !hasCalculated) {
      setHasCalculated(true);
      calculateWinner();
    }
  }, [showResult, hasCalculated]);

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen max-lg:h-full max-lg:min-h-100 text-white">
        <section className="relative w-full h-screen">
          <img
            src={
              oponentType === "ice"
                ? iceImage
                : oponentType === "fire"
                  ? lavaImage
                  : oponentType === "poison"
                    ? jungleImage
                    : oponentType === "ground"
                      ? caveImage
                      : oponentType === "rock"
                        ? rockImage
                        : oponentType === "ghost" || oponentType === "psychic"
                          ? ghostImage
                          : oponentType === "water"
                            ? lakeImage
                            : florestImage
            }
            alt="enviroment"
            className="absolute w-full h-full z-0 object-cover"
          />
          {pokemonOponent && isCapturing && (
            <img
              src={pokemonOponent}
              alt=""
              className={`absolute left-1/2 top-3/7 w-36 h-36 -translate-1/2 z-0 ${
                isFighting
                  ? attacker === "top"
                    ? "animate-attack-down"
                    : "animate-hit-right"
                  : "animate-pulse"
              }`}
            />
          )}
          {attacker === "top" && isFighting && (
            <span className="absolute left-1/2 top-3/7 -translate-x-1/2 -translate-y-30 text-white font-bold">AAAARRRGG!! NHAC!</span>
          )}
          {attacker === "bottom" && isFighting && (
            <span className="absolute left-1/2 bottom-40 -translate-x-1/2 translate-y-30 text-white font-bold">Whooshh!! GRRRRR!</span>
          )}
          {attacker === "top" && isFighting && (
            <img
              src={
                oponentType === "grass"
                  ? grassAttack
                  : oponentType === "water"
                    ? waterAttack
                    : oponentType === "ice"
                      ? iceAttack
                      : oponentType === "fire"
                        ? fireAttack
                        : oponentType === "rock" || oponentType === "ground"
                          ? rockAttack
                          : oponentType === "bug" || oponentType === "poison"
                            ? poisonAttack
                            : oponentType === "psychic" ||
                                oponentType === "ghost"
                              ? psychicAttack
                              : oponentType === "electric"
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
                myPokemonType === "grass"
                  ? grassAttack
                  : myPokemonType === "water"
                    ? waterAttack
                    : myPokemonType === "ice"
                      ? iceAttack
                      : myPokemonType === "fire"
                        ? fireAttack
                        : myPokemonType === "rock" || myPokemonType === "ground"
                          ? rockAttack
                          : myPokemonType === "bug" || myPokemonType === "poison"
                            ? poisonAttack
                            : myPokemonType === "psychic" ||
                                myPokemonType === "ghost"
                              ? psychicAttack
                              : myPokemonType === "electric"
                                ? thunderAttack
                                : genericAttack
              }
              alt="attack"
              className={`absolute left-1/2 bottom-40 -translate-x-1/2 w-28 animate-power-attack-up opacity-0`}
            />
          )}
          {!isCapturing && (
            <img
              src={lightCircle}
              alt=""
              className={`absolute left-1/2 top-3/7 w-24 opacity-0 -translate-1/2 z-0 animate-circle-effect`}
            />
          )}
          {myPokemon && isFighting && (
            <img
              src={myPokemon}
              alt="pokemon"
              className={`absolute left-1/2 bottom-0 w-48 h-48 -translate-1/2 z-0 ${
                isFighting
                  ? attacker === "top"
                    ? "animate-hit-left"
                    : "animate-attack-up"
                  : ""
              }`}
            />
          )}
          {!isFighting && (
            <img
              src={pokeball}
              alt="pokeball"
              className={`absolute left-1/2 bottom-0 opacity-0 w-12 -translate-1/2 z-0 ${
                !isFighting ? "animate-pokeball-hit" : ""
              }`}
            />
          )}
          {!isCapturing && (
            <img
              src={pokeball}
              alt="pokeball"
              className={`absolute left-1/2 bottom-75 w-12 -translate-1/2 z-0 animate-pokeball-captured`}
            />
          )}
          {wonBattle === true && !isCapturing && showResult && (
            <div className="absolute flex flex-col gap-4 items-center justify-center w-full h-full bg-[#000000b2] z-10 px-4">
              <img
                src={pokemonOponent}
                alt="pokemon"
                className={`w-36 h-36 z-20 mb-8`}
              />
              <h1 className="text-2xl font-bold top-8 text-center z-50 text-green-400">
                Oba! Você capturou o {param.pokemonOponent?.toUpperCase()}!
              </h1>
              <p className="text-xl font-bold top-32 text-center ">
                Parabéns! Mais um pokémon para o seu time!
              </p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-center font-bold font-white">
                  Você ganhou +{pokemonReward}
                </p>
                <img src={energy} alt="energy" className="w-6" />
              </div>
              <p className="text-sm top-32 text-center ">
                Treine-o bastante para que possa evoluir e batalhar ao seu lado.
              </p>
              <Button text="Ver meus pokemon" path="/my-pokemons" />
            </div>
          )}

          {wonBattle === false && !isCapturing && showResult && (
            <div className="absolute flex flex-col gap-4 items-center justify-center w-full h-full bg-[#000000b2] z-10 px-4">
              <img
                src={pokemonOponent}
                alt="pokemon"
                className={`w-36 h-36 z-20 animate-pokemon-scape opacity-0`}
              />
              <img
                src={lightCircle}
                alt=""
                className={` w-24 opacity-0 animate-circle-effect z-20`}
              />
              <h1 className="text-2xl font-bold top-8 text-center z-50 text-red-400">
                Ops! {param.pokemonOponent?.toUpperCase()} escapou!
              </h1>
              <p className="text-xl font-bold top-32 text-center">
                O {param.pokemonOponent?.toUpperCase()} foi muito forte e não
                foi possível capturá-lo.
              </p>
              <p className="text-sm top-32 text-center ">
                Continue treinando seu pokemon para ter mais chances de captura.
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
                <Button text="Sair" path="/capture-pokemon" />
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default PokemonBattle;
