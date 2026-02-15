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
import { useEffect, useState } from "react";
import { usePokemon } from "../context/usePokemon";
import Button from "../components/Button";
import type { Pokemon } from "@/context/pokemonTypes";

const PokemonBattleLeague = () => {
  // const [pokemonOponentImages, setPokemonOponentImages] = useState<string[]>();
  // const [oponentType, setOponentType] = useState<string[]>();
  // const [myPokemonType, setMyPokemonType] = useState<string[]>();
  // const [myPokemon, setMyPokemon] = useState("");
  const { state } = usePokemon();
  const [wonBattle] = useState<boolean | undefined>(undefined);
  const [showResult, setShowResult] = useState(false);
  const [pokemonReward] = useState<number>(1);
  const [isFighting, setIsFighting] = useState(true);
  const [isCapturing] = useState(true);
  // const hasRun = useRef(false);
  const [attacker, setAttacker] = useState<"top" | "bottom">("top");
  const [round, setRound] = useState<number>(0);
  const [myPokemonIndexFighting, setmyPokemonIndexFighting] =
    useState<number>(0);
  const [oponnentPokemonIndexFighting, setOponnentPokemonIndexFighting] =
    useState<number>(0);

  const [hasCalculated, setHasCalculated] = useState(false);
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
  const myPokemonsIdArray = myPokemonsId?.split("&").map(Number);

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
  // console.log(myActiveIndex, oponnentActiveIndex)

  const myActive = myPokemonWinners[round] === false ? round : myActiveIndex;

  // console.log(myActiveIndex)

  const mySafeIndex = myActive >= 0 && myActive < 5 ? myActive : 0;

  //oponente
  const oponnentActive =
    oponnentPokemonWinners[round] === false ? round : oponnentActiveIndex;

  // console.log(oponnentActiveIndex)

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
        //PEGAR O NOME DE CADA UM E PEGAR O HP DELES E COLOCAR NUM ARRAY
        setMyPokemonsName(names);
      });

      // console.log(myPokemonsHP);
    } catch (error) {
      console.log("Cannot get the pokemon oponent and your pokemon.", error);
    }
  };

  // useEffect(() => {
  //   console.log(round);
  // }, [round]);

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

  // console.log(myPokemonsInfos);

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

  // const getNextAliveIndex = (arr: (boolean | null)[]) => {
  //   return arr.findIndex((v) => v !== false);
  // };

  const trainers = [
    {
      name: "brock",
      winRate: 75,
      loseRate: 65,
      pokemons: [
        { id: 74, name: "Geodude", type: "rock" },
        { id: 95, name: "Onix", type: "rock" },
        { id: 37, name: "Vulpix", type: "fire" },
        { id: 138, name: "Omanyte", type: "rock" },
        { id: 111, name: "Rhyhorn", type: "ground" },
      ],
    },
    {
      name: "misty",
      winRate: 70,
      loseRate: 60,
      pokemons: [
        { id: 120, name: "Staryu", type: "water" },
        { id: 121, name: "Starmie", type: "water" },
        { id: 55, name: "Golduck", type: "water" },
        { id: 131, name: "Lapras", type: "water" },
        { id: 130, name: "Gyarados", type: "water" },
      ],
    },
    {
      name: "surge",
      winRate: 67,
      loseRate: 57,
      pokemons: [
        { id: 26, name: "Raichu", type: "electric" },
        { id: 101, name: "Electrode", type: "electric" },
        { id: 82, name: "Magneton", type: "electric" },
        { id: 125, name: "Electabuzz", type: "electric" },
        { id: 135, name: "Jolteon", type: "electric" },
      ],
    },
    {
      name: "erika",
      winRate: 65,
      loseRate: 50,
      pokemons: [
        { id: 71, name: "Victreebel", type: "grass" },
        { id: 45, name: "Vileplume", type: "grass" },
        { id: 114, name: "Tangela", type: "grass" },
        { id: 103, name: "Exeggutor", type: "grass" },
        { id: 47, name: "Parasect", type: "bug/grass" },
      ],
    },
    {
      name: "koga",
      winRate: 63,
      loseRate: 47,
      pokemons: [
        { id: 110, name: "Weezing", type: "poison" },
        { id: 89, name: "Muk", type: "poison" },
        { id: 169, name: "Crobat", type: "poison" },
        { id: 49, name: "Venomoth", type: "bug" },
        { id: 73, name: "Tentacruel", type: "water" },
      ],
    },
    {
      name: "sabrina",
      winRate: 60,
      loseRate: 45,
      pokemons: [
        { id: 65, name: "Alakazam", type: "psychic" },
        { id: 122, name: "Mr. Mime", type: "psychic" },
        { id: 97, name: "Hypno", type: "psychic" },
        { id: 80, name: "Slowbro", type: "water" },
        { id: 196, name: "Espeon", type: "psychic" },
      ],
    },
    {
      name: "blaine",
      winRate: 58,
      loseRate: 42,
      pokemons: [
        { id: 59, name: "Arcanine", type: "fire" },
        { id: 126, name: "Magmar", type: "fire" },
        { id: 78, name: "Rapidash", type: "fire" },
        { id: 38, name: "Ninetales", type: "fire" },
        { id: 6, name: "Charizard", type: "fire" },
      ],
    },
    {
      name: "giovanni",
      winRate: 56,
      loseRate: 40,
      pokemons: [
        { id: 34, name: "Nidoking", type: "poison" },
        { id: 31, name: "Nidoqueen", type: "poison" },
        { id: 112, name: "Rhydon", type: "ground" },
        { id: 51, name: "Dugtrio", type: "ground" },
        { id: 53, name: "Persian", type: "normal" },
      ],
    },
    {
      name: "lorelei",
      winRate: 54,
      loseRate: 35,
      pokemons: [
        { id: 131, name: "Lapras", type: "water" },
        { id: 91, name: "Cloyster", type: "water" },
        { id: 124, name: "Jynx", type: "ice" },
        { id: 87, name: "Dewgong", type: "water" },
        { id: 80, name: "Slowbro", type: "water" },
      ],
    },
    {
      name: "bruno",
      winRate: 52,
      loseRate: 32,
      pokemons: [
        { id: 68, name: "Machamp", type: "fighting" },
        { id: 106, name: "Hitmonlee", type: "fighting" },
        { id: 107, name: "Hitmonchan", type: "fighting" },
        { id: 95, name: "Onix", type: "rock" },
        { id: 57, name: "Primeape", type: "fighting" },
      ],
    },
    {
      name: "agatha",
      winRate: 50,
      loseRate: 30,
      pokemons: [
        { id: 94, name: "Gengar", type: "ghost" },
        { id: 93, name: "Haunter", type: "ghost" },
        { id: 24, name: "Arbok", type: "poison" },
        { id: 169, name: "Crobat", type: "poison" },
        { id: 200, name: "Misdreavus", type: "ghost" },
      ],
    },
    {
      name: "lance",
      winRate: 47,
      loseRate: 27,
      pokemons: [
        { id: 149, name: "Dragonite", type: "dragon" },
        { id: 130, name: "Gyarados", type: "water" },
        { id: 142, name: "Aerodactyl", type: "rock" },
        { id: 6, name: "Charizard", type: "fire" },
        { id: 230, name: "Kingdra", type: "water" },
      ],
    },
    {
      name: "gary",
      winRate: 35,
      loseRate: 15,
      pokemons: [
        { id: 18, name: "Pidgeot", type: "normal" },
        { id: 65, name: "Alakazam", type: "psychic" },
        { id: 112, name: "Rhydon", type: "ground" },
        { id: 59, name: "Arcanine", type: "fire" },
        { id: 103, name: "Exeggutor", type: "grass" },
      ],
    },
  ];

  const simulateBattle = () => {
    //   //WIN RATE DO POKÉMON MEU POKEMON: (0 ATÉ 100) - HP
    //   //WIN RATE DO TRAINADOR: (Bônus de  até 10% - XP (XP/1000)%)
    //   // 1 - MAIOR - 75% / MENOR - 65% F1
    //   // 2 - MAIOR - 72% / MENOR - 62% F2
    //   // 3 - MAIOR - 70% / MENOR - 60% F3
    //   // 4 - MAIOR - 65% / MENOR - 55% M1
    //   // 5 - MAIOR - 62% / MENOR - 52% M2
    //   // 6 - MAIOR - 60% / MENOR - 50% M3
    //   // 7 - MAIOR - 57% / MENOR - 47% M4
    //   // 8 - MAIOR - 55% / MENOR - 45% M5
    //   // 9 - MAIOR - 50% / MENOR - 40% D1
    //   // 10 - MAIOR - 47% / MENOR - 37% D2
    //   // 11 - MAIOR - 45% / MENOR - 35% D3
    //   // 12 - MAIOR - 40% / MENOR - 30% D4
    //   // 13 - MAIOR - 30% / MENOR - 20% I
    let my = [...myPokemonWinners];
    let opponent = [...oponnentPokemonWinners];

    trainers.forEach((trainer) => {
      if (trainer.name === oponnentName) {
        while (true) {
          const myIndex = my.findIndex((v) => v !== false);
          const opponentIndex = opponent.findIndex((v) => v !== false);

          // Se algum lado não tiver mais Pokémon válidos, encerra
          if (myIndex < 0 || opponentIndex < 0) break;

          // Segurança extra contra estouro de array
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
    console.log(my, opponent);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showResult && !hasCalculated) {
      setHasCalculated(true);
      simulateBattle();
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
