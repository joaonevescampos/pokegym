import florestImage from "../assets/florest.png";
import pokeball from "../assets/pokeball-animation.png";
import lightCircle from "../assets/light-circle.png";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePokemon } from "../context/usePokemon";
import Button from "../components/Button";

const PokemonBattle = () => {
  const [pokemonOponent, setPokemonOponent] = useState("");
  const [myPokemon, setMyPokemon] = useState("");
  const { state, capturePokemon } = usePokemon();
  const [wonBattle, setWonBattle] = useState<boolean | undefined>(undefined);
  const [showResult, setShowResult] = useState(false);
  const [oponentType, setOponentType] = useState("");

  const param = useParams();

  const getPokemonImage = async (name: string, isOponent: boolean) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      if (isOponent) {
        setPokemonOponent(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
        );
      } else {
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

  const calculateWinner = async () => {
    try {
      const responseId = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${param.pokemonOponent}`,
      );
      const data1 = await responseId.json();
      console.log("data 1", data1);
      console.log("TYPE api", data1.types[0].type.name);

      setOponentType(data1.types[0].type.name);
      const responseCaptureRate: any = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${data1.id}`,
      );
      const data2 = await responseCaptureRate.json();

      //calculo de de vitória
      const captureRate = data2.capture_rate;
      const maxCaptureRate = 255;
      const maxLevel = 100;
      const maxCapturedPokemons = 68;
      const userTotalPokemon = state.myPokemons.length;

      const pokemonChose = state.myPokemons.filter(
        (pokemon) => pokemon.name === param.pokemonChose,
      )[0];
      const pokemonChoseLevel = pokemonChose.xp;

      const winRate = captureRate + userTotalPokemon + pokemonChoseLevel;
      const total = maxCaptureRate + maxLevel + maxCapturedPokemons;

      const randomNumberToWin: number = Math.ceil(Math.random() * total);

      if (randomNumberToWin <= winRate) {
        setWonBattle(true);
        capturePokemon(param.pokemonOponent!, oponentType);
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

  useEffect(() => {
    if (showResult) {
      calculateWinner();
    }
  }, [showResult]);

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen max-lg:h-full max-lg:min-h-100 text-white">
        <section className="relative w-full h-screen">
          <img
            src={florestImage}
            alt="florest"
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
                  : ""
              }`}
            />
          )}
          {!isCapturing && (
            <img
              src={lightCircle}
              alt=""
              className={`absolute left-1/2 top-3/7 w-24 opacity-0 -translate-1/2 z-0 animate-circle-effect`}
            />
          )}
          {isFighting && (
            <div
              className={`flex flex-col items-center absolute left-1/2 bottom-[28%] -translate-1/2 z-0 ${
                isFighting ? "animate-float" : ""
              }`}
            ></div>
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
          {!isFighting && (
            <img
              src={pokeball}
              alt="florest"
              className={`absolute left-1/2 bottom-0 opacity-0 w-12 -translate-1/2 z-0 ${
                !isFighting ? "animate-pokeball-hit" : ""
              }`}
            />
          )}
          {!isCapturing && (
            <img
              src={pokeball}
              alt="florest"
              className={`absolute left-1/2 bottom-75 w-12 -translate-1/2 z-0 animate-pokeball-captured`}
            />
          )}
          {wonBattle === true && !isCapturing && showResult && (
            <div className="absolute flex flex-col gap-4 items-center justify-center w-full h-full bg-black opacity-80 z-10 px-4">
              <img
                src={pokemonOponent}
                alt=""
                className={`w-36 h-36 z-20 mb-8`}
              />
              <h1 className="text-2xl font-bold top-8 text-center z-50 text-green-400">
                Oba! Você capturou o {param.pokemonOponent?.toUpperCase()}!
              </h1>
              <p className="text-xl font-bold top-32 text-center ">
                Parabéns! Mais um pokémon para o seu time!
              </p>
              <p className="text-sm top-32 text-center ">
                Treine-o bastante para que possa evoluir e batalhar ao seu lado.
              </p>
              <Button text="Ver meus pokemon" path="/my-pokemons" />
            </div>
          )}

          {wonBattle === false && !isCapturing && showResult && (
            <div className="absolute flex flex-col gap-4 items-center justify-center w-full h-full bg-black opacity-80 z-10 px-4">
              <img
                src={pokemonOponent}
                alt=""
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
              <p className="text-xl font-bold top-32 text-center ">
                O {param.pokemonOponent?.toUpperCase()} foi muito forte e não
                foi possível capturá-lo.
              </p>
              <p className="text-sm top-32 text-center ">
                Continue treinando seu pokemon para ter mais chances de captura.
              </p>
              <Button text="Capturar pokémon" path="/capture-pokemon" />
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default PokemonBattle;
