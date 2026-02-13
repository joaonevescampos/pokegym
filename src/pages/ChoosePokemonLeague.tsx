import PokemonCard from "../components/PokemonCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePokemon } from "../context/usePokemon";
import { useState } from "react";
import Button from "../components/Button";
import pokebola from "../assets/pokeball.png";
import xIcon from "../assets/x.png";
import gym1 from "../assets/gym/gym-1.png";
import gym2 from "../assets/gym/gym-2.png";
import gym3 from "../assets/gym/gym-3.png";
import gym4 from "../assets/gym/gym-4.png";
import gym5 from "../assets/gym/gym-5.png";
import gym6 from "../assets/gym/gym-6.png";
import gym7 from "../assets/gym/gym-7.png";
import gym8 from "../assets/gym/gym-8.png";
import gym9 from "../assets/gym/gym-9.png";
import brock from "../assets/league/brock.png";
import misty from "../assets/league/misty.png";
import surge from "../assets/league/surge.png";
import erika from "../assets/league/erika.png";
import koga from "../assets/league/koga.png";
import sabrina from "../assets/league/sabrina.png";
import blaine from "../assets/league/blaine.png";
import giovanni from "../assets/league/giovanni.png";
import lorelei from "../assets/league/lorelei.png";
import bruno from "../assets/league/bruno.png";
import agatha from "../assets/league/agatha.png";
import lance from "../assets/league/lance.png";
import gary from "../assets/league/gary.png";

const trainers = [
  {
    trainer: "Brock",
    level: 1,
    pokemons: [
      { id: 74, name: "Geodude", type: "rock" },
      { id: 95, name: "Onix", type: "rock" },
      { id: 37, name: "Vulpix", type: "fire" },
      { id: 138, name: "Omanyte", type: "rock" },
      { id: 111, name: "Rhyhorn", type: "ground" },
    ],
  },
  {
    trainer: "Misty",
    level: 1,
    pokemons: [
      { id: 120, name: "Staryu", type: "water" },
      { id: 121, name: "Starmie", type: "water" },
      { id: 55, name: "Golduck", type: "water" },
      { id: 131, name: "Lapras", type: "water" },
      { id: 130, name: "Gyarados", type: "water" },
    ],
  },
  {
    trainer: "Surge",
    level: 2,
    pokemons: [
      { id: 26, name: "Raichu", type: "electric" },
      { id: 101, name: "Electrode", type: "electric" },
      { id: 82, name: "Magneton", type: "electric" },
      { id: 125, name: "Electabuzz", type: "electric" },
      { id: 135, name: "Jolteon", type: "electric" },
    ],
  },
  {
    trainer: "Erika",
    level: 2,
    pokemons: [
      { id: 71, name: "Victreebel", type: "grass" },
      { id: 45, name: "Vileplume", type: "grass" },
      { id: 114, name: "Tangela", type: "grass" },
      { id: 103, name: "Exeggutor", type: "grass" },
      { id: 47, name: "Parasect", type: "bug/grass" },
    ],
  },
  {
    trainer: "Koga",
    level: 3,
    pokemons: [
      { id: 110, name: "Weezing", type: "poison" },
      { id: 89, name: "Muk", type: "poison" },
      { id: 169, name: "Crobat", type: "poison" },
      { id: 49, name: "Venomoth", type: "bug" },
      { id: 73, name: "Tentacruel", type: "water" },
    ],
  },
  {
    trainer: "Sabrina",
    level: 3,
    pokemons: [
      { id: 65, name: "Alakazam", type: "psychic" },
      { id: 122, name: "Mr. Mime", type: "psychic" },
      { id: 97, name: "Hypno", type: "psychic" },
      { id: 80, name: "Slowbro", type: "water" },
      { id: 196, name: "Espeon", type: "psychic" },
    ],
  },
  {
    trainer: "Blaine",
    level: 3,
    pokemons: [
      { id: 59, name: "Arcanine", type: "fire" },
      { id: 126, name: "Magmar", type: "fire" },
      { id: 78, name: "Rapidash", type: "fire" },
      { id: 38, name: "Ninetales", type: "fire" },
      { id: 6, name: "Charizard", type: "fire" },
    ],
  },
  {
    trainer: "Giovanni",
    level: 4,
    pokemons: [
      { id: 34, name: "Nidoking", type: "poison" },
      { id: 31, name: "Nidoqueen", type: "poison" },
      { id: 112, name: "Rhydon", type: "ground" },
      { id: 51, name: "Dugtrio", type: "ground" },
      { id: 53, name: "Persian", type: "normal" },
    ],
  },
  {
    trainer: "Lorelei",
    level: 4,
    pokemons: [
      { id: 131, name: "Lapras", type: "water" },
      { id: 91, name: "Cloyster", type: "water" },
      { id: 124, name: "Jynx", type: "ice" },
      { id: 87, name: "Dewgong", type: "water" },
      { id: 80, name: "Slowbro", type: "water" },
    ],
  },
  {
    trainer: "Bruno",
    level: 4,
    pokemons: [
      { id: 68, name: "Machamp", type: "fighting" },
      { id: 106, name: "Hitmonlee", type: "fighting" },
      { id: 107, name: "Hitmonchan", type: "fighting" },
      { id: 95, name: "Onix", type: "rock" },
      { id: 57, name: "Primeape", type: "fighting" },
    ],
  },
  {
    trainer: "Agatha",
    level: 4,
    pokemons: [
      { id: 94, name: "Gengar", type: "ghost" },
      { id: 93, name: "Haunter", type: "ghost" },
      { id: 24, name: "Arbok", type: "poison" },
      { id: 169, name: "Crobat", type: "poison" },
      { id: 200, name: "Misdreavus", type: "ghost" },
    ],
  },
  {
    trainer: "Lance",
    level: 4,
    pokemons: [
      { id: 149, name: "Dragonite", type: "dragon" },
      { id: 130, name: "Gyarados", type: "water" },
      { id: 142, name: "Aerodactyl", type: "rock" },
      { id: 6, name: "Charizard", type: "fire" },
      { id: 230, name: "Kingdra", type: "water" },
    ],
  },
  {
    trainer: "Gary",
    level: 5,
    pokemons: [
      { id: 18, name: "Pidgeot", type: "normal" },
      { id: 65, name: "Alakazam", type: "psychic" },
      { id: 112, name: "Rhydon", type: "ground" },
      { id: 59, name: "Arcanine", type: "fire" },
      { id: 103, name: "Exeggutor", type: "grass" },
    ],
  },
];

const ChoosePokemonLeague = () => {
  const { state } = usePokemon();
  const oponnentName = useParams().oponnent;
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [selectedPokemonsIndex, setSelectedPokemonsIndex] = useState<number[]>(
    [],
  );

  const trainerChoosed = trainers.find(
    (trainer) => trainer.trainer.toLowerCase() === oponnentName,
  );

  const handleClick = (index: number) => {
    if (selectedPokemonsIndex.some((i) => i === index)) {
      return;
    }
    const pokemonSelectedUpdated = [...selectedPokemonsIndex, index];
    const pokemonSliced = pokemonSelectedUpdated.slice(-5);

    setSelectedPokemonsIndex(pokemonSliced);
  };

  const startBattle = async () => {
    if (state.userStatus.pokeball === 0) {
      setAlert(true);
    } else {
      setAlert(false);
      const pokemonsOponnentId = trainerChoosed?.pokemons
        .map((pokemon) => pokemon.id)
        .toString()
        .replaceAll(",", "&");
      let myPokemonsIds = "";
      try {
        for (let i = 0; i < selectedPokemonsIndex.length; i++) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${state.myPokemons[selectedPokemonsIndex[i]].name}`,
          );
          const data = await response.json();
          myPokemonsIds += "&" + data?.id.toString();
        }
      } catch (error) {
        console.log("cannot get pokemon id");
      }

      myPokemonsIds = myPokemonsIds.slice(1, myPokemonsIds.length)

      navigate(
        `/pokemon-league-battle/${oponnentName}/${pokemonsOponnentId}/${myPokemonsIds}`,
      );
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center h-full max-lg:h-full max-lg:min-h-100 text-white">
        <section className="relative w-full h-72">
          <img
            src={
              oponnentName === "brock"
                ? gym3
                : oponnentName === "misty"
                  ? gym5
                  : oponnentName === "surge"
                    ? gym2
                    : oponnentName === "erika"
                      ? gym1
                      : oponnentName === "koga"
                        ? gym4
                        : oponnentName === "sabrina"
                          ? gym6
                          : oponnentName === "blaine"
                            ? gym7
                            : oponnentName === "giovanni"
                              ? gym8
                              : gym9
            }
            alt="enviroment"
            className="absolute w-full h-full z-0 object-cover pointer-events-none"
          />
          <div className="absolute flex items-end gap-2 top-4 left-4">
            <Link to="/pokemon-league" className="text-sm font-bold ">
              voltar
            </Link>
          </div>

          <img
            src={
              oponnentName === "brock"
                ? brock
                : oponnentName === "misty"
                  ? misty
                  : oponnentName === "surge"
                    ? surge
                    : oponnentName === "erika"
                      ? erika
                      : oponnentName === "koga"
                        ? koga
                        : oponnentName === "sabrina"
                          ? sabrina
                          : oponnentName === "blaine"
                            ? blaine
                            : oponnentName === "giovanni"
                              ? giovanni
                              : oponnentName === "lorelei"
                                ? lorelei
                                : oponnentName === "bruno"
                                  ? bruno
                                  : oponnentName === "agatha"
                                    ? agatha
                                    : oponnentName === "lance"
                                      ? lance
                                      : gary
            }
            alt="oponnent"
            className="absolute left-1/2 top-1/2  h-48 -translate-1/2 z-0"
          />
        </section>
        <section className="flex flex-col gap-12 items-center justify-start px-4 py-8 h-full">
          <h2 className="text-white font-bold text-xl text-center">
            Pokémons do {oponnentName?.toUpperCase()}
          </h2>
          <div className="flex gap-2">
            {trainerChoosed?.pokemons.map((pokemon) => (
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                alt="pokemon"
                className="max-lg:w-16 w-24 border-2 border-gray-600 rounded-2xl bg-gray-800 p-1"
              />
            ))}
          </div>
          <h2 className="text-white font-bold text-xl text-center">
            Escolha 5 pokémons para batalhar contra o{" "}
            {oponnentName?.toUpperCase()}
          </h2>
          <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4 items-center justify-center text-xl max-w-300">
            {state.myPokemons.map((pokemon, index) => (
              <PokemonCard
                key={index}
                name={pokemon.name}
                buttonText={`${
                  selectedPokemonsIndex.some((i) => i === index)
                    ? "selecionado"
                    : "selecionar"
                }`}
                buttonStyle={`${
                  selectedPokemonsIndex.some((i) => i === index) &&
                  "bg-bt-purple! text-white!"
                }`}
                level={pokemon.level}
                inactive={false}
                buttonClick={() => handleClick(index)}
              />
            ))}
          </div>
        </section>
        {selectedPokemonsIndex.length === 5 ? (
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
