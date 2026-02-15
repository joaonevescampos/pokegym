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

import lightCircle from "../assets/light-circle.png";
import energy from "../assets/energy.png";
import xIcon from "../assets/x.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { usePokemon } from "../context/usePokemon";
import Button from "../components/Button";
import type { Pokemon } from "@/context/pokemonTypes";

const PokemonBattleLeague = () => {
  // const [pokemonOponentImages, setPokemonOponentImages] = useState<string[]>();
  // const [oponentType, setOponentType] = useState<string[]>();
  // const [myPokemonType, setMyPokemonType] = useState<string[]>();
  // const [myPokemon, setMyPokemon] = useState("");
  const { state, usePokeball } = usePokemon();
  const [wonBattle] = useState<boolean | undefined>(undefined);
  const [showResult, setShowResult] = useState(false);
  const [pokemonReward] = useState<number>(1);
  const [isFighting, setIsFighting] = useState(true);
  const [isCapturing] = useState(true);
  const hasRun = useRef(false);
  const [attacker, setAttacker] = useState<"top" | "bottom">("top");
  const [round, setRound] = useState<number>(0);
  // const [myPokemonIndexFighting, setmyPokemonIndexFighting] =
  //   useState<number>(0);
  // const [oponnentPokemonIndexFighting, setOponnentPokemonIndexFighting] =
  //   useState<number>(0);

  const [hasCalculated, setHasCalculated] = useState(false);
  const [myPokemonWinners] = useState<(null | boolean)[]>([
    false,
    false,
    true,
    null,
    null,
  ]);
  const [oponnentPokemonWinners] = useState<
    (null | boolean)[]
  >([false, false, false, false, false]);
  const [oponnentPokemonsCaptureRate, setOponnentPokemonsCaptureRate] =
    useState<number[]>([]);
  const [myPokemonsName, setMyPokemonsName] = useState<string[]>([]);
  const [myPokemonsInfos, setMyPokemonsInfos] = useState<Pokemon[]>([]);
  const navigate = useNavigate();

  const param = useParams();
  const pokemonsOponnentId = param.oponnentPokemons;
  const myPokemonsId = param?.myPokemons;
  const oponnentName = param?.oponnentName;
  const myPokemonsIdArray = myPokemonsId?.split("&").map(Number);

  const oponnentPokemonsIdArray = pokemonsOponnentId?.split("&").map(Number);
  const myPokemonsImages = myPokemonsIdArray?.map((id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  });
  const oponnentPokemonsImages = oponnentPokemonsIdArray?.map((id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  });

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
        //PEGAR O NOME DE CADA UM E PEGAR O HP DELES E COLOCAR NUM ARRAY
        setMyPokemonsName(names);
      });

      // console.log(myPokemonsHP);
    } catch (error) {
      console.log("Cannot get the pokemon oponent and your pokemon.", error);
    }
  };

  useEffect(() => {
    console.log(round);
  }, [round]);

  useEffect(() => {
    const myPokemons = state.myPokemons.filter((pokemon) => {
      const existName = myPokemonsName.some(
        (pokemonName) => pokemonName === pokemon.name,
      );
      if (existName) {
        return pokemon;
      }
    });
    setMyPokemonsInfos(myPokemons);
  }, [myPokemonsName]);

  useEffect(() => {
    getPokemonsInfos();

    const interval = setInterval(() => {
      setAttacker((prev) => (prev === "top" ? "bottom" : "top"));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
      if (round < 4) {
        setRound(round + 1);
        calculateWinner(round);
      } else {
        setIsFighting(false);
      }
    }, 12000);

    return () => clearTimeout(timer);
  }, [round]);

  // useEffect(() => {
  //   if (!isFighting) {
  //     const timer = setTimeout(() => {
  //       setIsCapturing(false);
  //     }, 1500);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isFighting]);

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

  const calculateWinner = async (round: number) => {
    //WIN RATE DO POKÉMON OPONENTE: (0 ATÉ 255)/ 2.55 - (0 ATÉ 100)
    console.log(oponnentPokemonsCaptureRate, round, myPokemonsInfos, myPokemonWinners, oponnentPokemonWinners)
    //WIN RATE DO POKÉMON MEU POKEMON: (0 ATÉ 100) - HP
    //WIN RATE DO TRAINADOR: (Bônus de  até 10% - XP (XP/1000)%)
    // 1 - MAIOR - 75% / MENOR - 65% F1
    // 2 - MAIOR - 72% / MENOR - 62% F2
    // 3 - MAIOR - 70% / MENOR - 60% F3
    // 4 - MAIOR - 65% / MENOR - 55% M1
    // 5 - MAIOR - 62% / MENOR - 52% M2
    // 6 - MAIOR - 60% / MENOR - 50% M3
    // 7 - MAIOR - 57% / MENOR - 47% M4
    // 8 - MAIOR - 55% / MENOR - 45% M5
    // 9 - MAIOR - 50% / MENOR - 40% D1
    // 10 - MAIOR - 47% / MENOR - 37% D2
    // 11 - MAIOR - 45% / MENOR - 35% D3
    // 12 - MAIOR - 40% / MENOR - 30% D4
    // 13 - MAIOR - 30% / MENOR - 20% I
   
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 42000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showResult && !hasCalculated) {
      setHasCalculated(true);
      // calculateWinner();
    }
  }, [showResult, hasCalculated]);

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
              src={
                oponnentPokemonsImages[
                  oponnentPokemonWinners[round ? round : 0] === false
                    ? round
                    : oponnentPokemonWinners.findIndex(
                        (v) => v === true || v === null,
                      )
                ]
              }
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
          {/* {attacker === "top" && isFighting && (
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
          )} */}
          {attacker === "bottom" && isFighting && (
            <img
              src={
                myPokemonsInfos[
                  myPokemonWinners.findIndex((v) => v === true || v === null)
                ].type === "grass"
                  ? grassAttack
                  : myPokemonsInfos[
                        myPokemonWinners[round ? round : 0] === false
                          ? round
                          : myPokemonWinners.findIndex(
                              (v) => v === true || v === null,
                            )
                      ].type === "water"
                    ? waterAttack
                    : myPokemonsInfos[
                          myPokemonWinners[round ? round : 0] === false
                            ? round
                            : myPokemonWinners.findIndex(
                                (v) => v === true || v === null,
                              )
                        ].type === "ice"
                      ? iceAttack
                      : myPokemonsInfos[
                            myPokemonWinners[round ? round : 0] === false
                              ? round
                              : myPokemonWinners.findIndex(
                                  (v) => v === true || v === null,
                                )
                          ].type === "fire"
                        ? fireAttack
                        : myPokemonsInfos[
                              myPokemonWinners[round ? round : 0] === false
                                ? round
                                : myPokemonWinners.findIndex(
                                    (v) => v === true || v === null,
                                  )
                            ].type === "rock" ||
                            myPokemonsInfos[
                              myPokemonWinners[round ? round : 0] === false
                                ? round
                                : myPokemonWinners.findIndex(
                                    (v) => v === true || v === null,
                                  )
                            ].type ===
                              "gmyPokemonWinners.findIndex((v) => v === true || v === null)"
                          ? rockAttack
                          : myPokemonsInfos[
                                myPokemonWinners[round ? round : 0] === false
                                  ? round
                                  : myPokemonWinners.findIndex(
                                      (v) => v === true || v === null,
                                    )
                              ].type === "bug" ||
                              myPokemonsInfos[
                                myPokemonWinners[round ? round : 0] === false
                                  ? round
                                  : myPokemonWinners.findIndex(
                                      (v) => v === true || v === null,
                                    )
                              ].type === "poison"
                            ? poisonAttack
                            : myPokemonsInfos[
                                  myPokemonWinners[round ? round : 0] === false
                                    ? round
                                    : myPokemonWinners.findIndex(
                                        (v) => v === true || v === null,
                                      )
                                ].type === "psychic" ||
                                myPokemonsInfos[
                                  myPokemonWinners[round ? round : 0] === false
                                    ? round
                                    : myPokemonWinners.findIndex(
                                        (v) => v === true || v === null,
                                      )
                                ].type === "ghost"
                              ? psychicAttack
                              : myPokemonsInfos[
                                    myPokemonWinners[round ? round : 0] ===
                                    false
                                      ? round
                                      : myPokemonWinners.findIndex(
                                          (v) => v === true || v === null,
                                        )
                                  ].type === "electric"
                                ? thunderAttack
                                : genericAttack
              }
              alt="attack"
              className={`absolute left-1/2 bottom-40 -translate-x-1/2 w-28 animate-power-attack-up opacity-0`}
            />
          )}

          {myPokemonsImages && (
            <img
              src={
                myPokemonsImages[
                  myPokemonWinners[round ? round : 0] === false
                    ? round
                    : myPokemonWinners.findIndex(
                        (v) => v === true || v === null,
                      )
                ]
              }
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

          {wonBattle === true && !isCapturing && showResult && (
            <div className="absolute flex flex-col gap-4 items-center justify-center w-full h-full bg-[#000000b2] z-10 px-4">
              {oponnentPokemonsImages && (
                <img
                  src={oponnentPokemonsImages[0]}
                  alt="pokemon"
                  className={`w-36 h-36 z-20 mb-8`}
                />
              )}
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

export default PokemonBattleLeague;
