import PokemonCard from "../components/PokemonCard";
import florestImage from "../assets/florest.png";
import caveImage from "../assets/cave.png";
import rockImage from "../assets/rock-cave.png";
import jungleImage from "../assets/jungle.png";
import lavaImage from "../assets/lava.png";
import ghostImage from "../assets/ghost.png";
import lakeImage from "../assets/lake.png";
import iceImage from "../assets/ice.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePokemon } from "../context/usePokemon";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import pokebola from "../assets/pokeball.png";
import xIcon from "../assets/x.png";

const ChoosePokemonLeague = () => {
  const { state } = usePokemon();
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState<
    number | undefined
  >(undefined);
  const [imageURL, setImageURL] = useState("");
  const param = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [oponentType, setOponentType] = useState("");

  useEffect(() => {
    getOponentType();
  }, []);

  const selectedPokemon =
    typeof selectedPokemonIndex === "number"
      ? state.myPokemons[selectedPokemonIndex]
      : null;

  const handleClick = (index: number) => {
    setSelectedPokemonIndex(index);
  };

  const getPokemonImage = async (name: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setImageURL(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
      );
    } catch (error) {
      console.log("cannot get pokemon image");
    }
  };

  const getOponentType = async () => {
    try {
      const responseId = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${param.pokemonOponent}`,
      );
      const data1 = await responseId.json();
      const type: string = data1.types[0].type.name;
      setOponentType(type);
    } catch (error) {
      console.log("Cannot get the oponent type.", error);
    }
  };

  const startBattle = () => {
    if (state.userStatus.pokeball === 0) {
      setAlert(true);
    } else {
      setAlert(false);
      navigate(
        `/pokemon-battle/${param?.pokemonOponent}/${selectedPokemon?.name}`,
      );
    }
  };

  useEffect(() => {
    if (param.pokemonOponent) {
      getPokemonImage(param.pokemonOponent);
    }
  }, []);
  return (
    <>
      <main className="flex flex-col items-center justify-center h-full max-lg:h-full max-lg:min-h-100 text-white">
        <section className="relative w-full h-72">
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
            className="absolute w-full h-full z-0 object-cover pointer-events-none"
          />
          <div className="absolute flex items-end gap-2 top-4 left-4">
            <Link to="/home" className="text-sm font-bold ">
              voltar
            </Link>
          </div>
          {imageURL && (
            <img
              src={imageURL}
              alt="florest"
              className="absolute left-1/2 top-1/2 w-48 h-48 -translate-1/2 z-0 animate-pokemon"
            />
          )}
        </section>
        <section className="flex flex-col gap-12 items-center justify-start px-4 py-8 h-full">
          <h1 className="text-white font-bold text-xl text-center">
            Escolha 5 pokémons para batalhar contra o{" "}
            {param.oponnent?.toUpperCase()}
          </h1>
          <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4 items-center justify-center text-xl max-w-300">
            {state.myPokemons.map((pokemon, index) => (
              <PokemonCard
                key={index}
                name={pokemon.name}
                buttonText={`${
                  selectedPokemonIndex === index ? "selecionado" : "selecionar"
                }`}
                buttonStyle={`${
                  selectedPokemonIndex === index && "bg-bt-purple! text-white!"
                }`}
                level={pokemon.level}
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
                Poxa, você não pode batalhar!
              </h1>
              <div className="flex items-end gap-2 top-4 right-4">
                <span className="text-sm font-bold opacity-70">
                  x {state.userStatus.pokeball}{" "}
                </span>
                <img src={pokebola} alt="pokebola" width={28} />
              </div>
              <p className="text-sm text-center">
                Você não tem pokebolas para batalhar e capturar um novo pokemon!
                Lamento muito! Para conseguir pokebolas você deve treinar seu
                pokemon concluindo todastarefas no seu checklist. Com tempo,
                você irá ganhar pokébolas e poderá batalhar!
              </p>
              <Button text="treinar pokemons" path="/my-pokemons" />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default ChoosePokemonLeague;
