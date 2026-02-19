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
import silver from "../assets/league/trainers2/silver.png";
import wallace from "../assets/league/trainers2/wallace.png";
import cynthia from "../assets/league/trainers2/cynthia.png";
import steven from "../assets/league/trainers2/steven.png";
import alder from "../assets/league/trainers2/alder.png";
import leon from "../assets/league/trainers2/leon.png";
import red from "../assets/league/trainers2/red.png";
import diantha from "../assets/league/trainers3/diantha.png";
import iris from "../assets/league/trainers3/iris.png";
import kukui from "../assets/league/trainers3/kukui.png";
import geeta from "../assets/league/trainers3/geeta.png";
import mustard from "../assets/league/trainers3/mustard.png";
import n from "../assets/league/trainers3/n.png";
import chairman from "../assets/league/trainers4/chairman.png";
import eternatus from "../assets/league/trainers4/eternatus.png";
import ghetsis from "../assets/league/trainers4/ghetsis.png";
import lysandre from "../assets/league/trainers4/lysandadre.png";
import ultra from "../assets/league/trainers4/ultra.png";
import creator from "../assets/league/trainers4/the-creator.png";
import volo from "../assets/league/trainers4/volo.png";

import { trainers1 } from "../data/trainers1";
import { trainers2 } from "../data/trainers2";
import { trainers3 } from "../data/trainers3";
import { trainers4 } from "../data/trainers4";

const arceus =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/493.png";

const mewtwo =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/150.png";

const trainerImages: any = {
  brock: brock,
  misty: misty,
  surge: surge,
  erika: erika,
  koga: koga,
  sabrina: sabrina,
  blaine: blaine,
  giovanni: giovanni,
  lorelei: lorelei,
  bruno: bruno,
  agatha: agatha,
  lance: lance,
  ghetsis: ghetsis,
  lysandre: lysandre,
  chairman: chairman,
  volo: volo,
  ultra: ultra,
  eternatus: eternatus,
  creator: creator,
  diantha: diantha,
  iris: iris,
  kukui: kukui,
  geeta: geeta,
  mustard: mustard,
  n: n,
  arceus: arceus,
  silver: silver,
  wallace: wallace,
  cynthia: cynthia,
  steven: steven,
  alder: alder,
  leon: leon,
  red: red,
  mewtwo: mewtwo,
  gary: gary,
};

const ChoosePokemonLeague = () => {
  const { state } = usePokemon();
  const oponnentName = useParams().oponnent;
  const league = Number(useParams().league);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [selectedPokemonsIndex, setSelectedPokemonsIndex] = useState<number[]>(
    [],
  );

  const trainerChoosed =
    league === 0
      ? trainers1.find(
          (trainer) => trainer.trainer.toLowerCase() === oponnentName,
        )
      : league === 1
        ? trainers2.find(
            (trainer) => trainer.trainer.toLowerCase() === oponnentName,
          )
        : league === 2
          ? trainers3.find(
              (trainer) => trainer.trainer.toLowerCase() === oponnentName,
            )
          : trainers4.find(
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
    const pokemonsOponnentId = trainerChoosed?.pokemons
      .map((pokemon: { id: number; name: string; type: string }) => pokemon.id)
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

    myPokemonsIds = myPokemonsIds.slice(1, myPokemonsIds.length);

    navigate(
      `/pokemon-league-battle/${league.toString()}/${oponnentName}/${pokemonsOponnentId}/${myPokemonsIds}`,
    );
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
          {oponnentName && (
            <img
              src={trainerImages[oponnentName]}
              alt="oponnent"
              className="absolute left-1/2 top-1/2  h-48 -translate-1/2 z-0"
            />
          )}
        </section>
        <section className="flex flex-col gap-12 items-center justify-start px-4 py-8 h-full">
          <h2 className="text-white font-bold text-xl text-center">
            Pokémons do {oponnentName?.toUpperCase()}
          </h2>
          <div className="flex gap-2">
            {trainerChoosed?.pokemons.map(
              (pokemon: { id: number; name: string; type: string }) => (
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                  alt="pokemon"
                  className="max-lg:w-16 w-24 border-2 border-gray-600 rounded-2xl bg-gray-800 p-1"
                />
              ),
            )}
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
