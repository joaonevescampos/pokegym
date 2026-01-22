import { useEffect, useState } from "react";
import Button from "./Button";

interface PokemonCard {
  name: string;
  pokemonSelected?: string;
  buttonText: string;
  buttonStyle?: string;
  level?: number;
  buttonPath?: string;
  inactive?: boolean;
  buttonClick?: () => void;
}

const PokemonCard = ({
  name,
  pokemonSelected,
  buttonText,
  buttonStyle,
  buttonPath,
  level,
  inactive,
  buttonClick,
}: PokemonCard) => {
  const [imageURL, setImageURL] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    takePokemonInfos(name);
  }, [name]);

  const takePokemonInfos = async (name: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setImageURL(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`
      );
      setType(data.types[0].type.name);
    } catch (error) {
      console.log("cannot get pokemon image");
    }
  };

  return (
    <section
      className={`relative flex flex-col items-center justify-center p-4 gap-2 bg-linear-to-br ${
        type === "electric"
          ? "from-gd-eletric1 to-gd-eletric2"
          : type === "grass"
          ? "from-gd-grass1 to-gd-grass2"
          : type === "water"
          ? "from-gd-water1 to-gd-water2"
          : type === "fire"
          ? "from-gd-fire1 to-gd-fire2"
          : type === "bug"
          ? "from-yellow-300 to-pink-800"
          : type === "poison"
          ? "from-pink-400 to-purple-900"
          : type === "ground"
          ? "from-brown-500 to-orange-200"
          : type === "psychic"
          ? "from-pink-800 to-purple-600"
          : type === "ghost"
          ? "from-purple-800 to-gray-800"
          : type === "rock"
          ? "from-gray-800 to-gray-300"
          : type === "ice"
          ? "from-blue-200 to-blue-500"
          : type === "dragon"
          ? "from-orange-400 to-green-400"
          : "from-gd-orange to-gd-blue"
      } rounded-xl max-w-64 p-4`}
    >
      <div className="absolute w-full h-full z-0 bg-black opacity-50 rounded-xl"></div>
      {imageURL ? (
        <img src={imageURL} alt={name} className="w-40 z-10" />
      ) : (
        <span>sem imagem</span>
      )}
      <h2 className="font-bold z-10 text-sm">{name.toUpperCase()}</h2>
      <span
        className={`font-bold text-xs ${
          type === "electric"
            ? "bg-amber-500"
            : type === "grass"
            ? "bg-emerald-700"
            : type === "water"
            ? "bg-blue-700"
            : type === "fire"
            ? "bg-red-600"
            : type === "bug"
            ? "bg-pink-800"
            : type === "poison"
            ? "bg-pink-500"
            : type === "ground"
            ? "bg-orange-950"
            : type === "psychic"
            ? "bg-black"
            : type === "ghost"
            ? "bg-purple-600"
            : type === "rock"
            ? "bg-gray-800"
            : type === "ice"
            ? "bg-blue-400"
            : type === "dragon"
            ? "bg-orange-500"
            : "bg-amber-700"
        }  text-white rounded-2xl px-2 z-10`}
      >
        {type}
      </span>
      <span className="z-20 text-xs font-bold opacity-70">level : {level === 10 ? "MAX" : level}</span>
      <Button
        text={buttonText}
        selected={pokemonSelected}
        pokemonName={name}
        path={buttonPath}
        inactive={inactive}
        onClick={buttonClick}
        style={buttonStyle}
      />
    </section>
  );
};

export default PokemonCard;
