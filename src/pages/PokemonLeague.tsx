import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import diamond from "../assets/diamond.png";
import token from "../assets/token.png";
import xIcon from "../assets/x.png";
import maleProfile from "../assets/male-profile.png";
import femaleProfile from "../assets/female-profile.png";
import { usePokemon } from "@/context/usePokemon";
import { Link, useNavigate } from "react-router-dom";
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
import Button from "@/components/Button";
import { useState } from "react";

const league = [
  {
    gym: gym3,
    oponnentName: "Brock",
    oponnentImage: brock,
    rewards: { pokeballs: 3 },
    battleLevel: "fácil 1",
    xp: 0,
    active: true,
    cost: 10,
  },
  {
    gym: gym5,
    oponnentName: "Misty",
    oponnentImage: misty,
    rewards: { pokeballs: 5 },
    battleLevel: "fácil 2",
    xp: 200,
    active: false,
    cost: 15,
  },
  {
    gym: gym2,
    oponnentName: "Surge",
    oponnentImage: surge,
    rewards: { pokeballs: 8 },
    battleLevel: "fácil 3",
    xp: 400,
    active: false,
    cost: 20,
  },
  {
    gym: gym1,
    oponnentName: "Erika",
    oponnentImage: erika,
    rewards: { pokeballs: 15 },
    battleLevel: "médio 1",
    xp: 600,
    active: false,
    cost: 21,
  },
  {
    gym: gym4,
    oponnentName: "Koga",
    oponnentImage: koga,
    rewards: { pokeballs: 20 },
    battleLevel: "médio 2",
    xp: 800,
    active: false,
    cost: 22,
  },
  {
    gym: gym6,
    oponnentName: "Sabrina",
    oponnentImage: sabrina,
    rewards: { pokeballs: 25 },
    battleLevel: "médio 3",
    xp: 1000,
    active: false,
    cost: 23,
  },
  {
    gym: gym7,
    oponnentName: "Blaine",
    oponnentImage: blaine,
    rewards: { pokeballs: 20, diamond: 1 },
    battleLevel: "médio 4",
    xp: 1200,
    active: false,
    cost: 24,
  },
  {
    gym: gym8,
    oponnentName: "giovanni",
    oponnentImage: giovanni,
    rewards: { pokeballs: 20, diamond: 2 },
    battleLevel: "médio 5",
    xp: 1400,
    active: false,
    cost: 25,
  },
  {
    gym: gym9,
    oponnentName: "Lorelei",
    oponnentImage: lorelei,
    rewards: { diamond: 3, pokeballs: 20 },
    battleLevel: "dificil 1",
    xp: 1600,
    active: false,
    cost: 26,
  },
  {
    gym: gym9,
    oponnentName: "bruno",
    oponnentImage: bruno,
    rewards: { pokeballs: 20, diamond: 4 },
    battleLevel: "dificil 2",
    xp: 1800,
    active: false,
    cost: 27,
  },
  {
    gym: gym9,
    oponnentName: "agatha",
    oponnentImage: agatha,
    rewards: { pokeballs: 20, diamond: 5 },
    battleLevel: "dificil 3",
    xp: 2000,
    active: false,
    cost: 28,
  },
  {
    gym: gym9,
    oponnentName: "Lance",
    oponnentImage: lance,
    rewards: { pokeballs: 20, diamond: 6 },
    battleLevel: "dificil 4",
    xp: 2200,
    active: false,
    cost: 29,
  },
  {
    gym: gym9,
    oponnentName: "Gary",
    oponnentImage: gary,
    rewards: { pokeballs: 30, diamond: 10 },
    battleLevel: "insano",
    xp: 2400,
    active: false,
    cost: 30,
  },
];

export function PokemonLeague() {
  const { state } = usePokemon();
  const [alert, setAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBattle = (cost: number, oponnentName: string) => {
    if (state.myPokemons.length < 5 || state.userStatus.token < cost) {
      setAlert(true);
    } else {
      navigate(`/choose-pokemon-league/${oponnentName.toLowerCase()}`);
    }
  };

  return (
    <>
      <header className="relative w-full h-fit text-white text-xs">
        <section>
          <div className="absolute flex items-end gap-2 top-4 left-4">
            <Link to="/home" className="font-bold opacity-70 z-20">
              HOME
            </Link>
          </div>
          <section className="absolute flex flex-col items-end gap-2 top-4 right-4">
            <div className="flex flex-col gap-4 items-end pb-2">
              <div className="flex gap-2 ">
                <div className="flex flex-col items-end">
                  <span className="font-bold">{state.userStatus.userName}</span>
                  <span className="opacity-60 font-bold ">
                    {" "}
                    {state.userStatus.xp} XP
                  </span>
                </div>
                <img
                  src={
                    state.userStatus.gender === "feminino"
                      ? femaleProfile
                      : maleProfile
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex items-end gap-1">
                  <span className="text-xs font-bold opacity-70">
                    x {state.userStatus.token}{" "}
                  </span>
                  <img src={token} alt="token" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xs font-bold opacity-70">
                    x {state.userStatus.pokeball}{" "}
                  </span>
                  <img src={pokebola} alt="pokebola" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xs font-bold opacity-70">
                    x {state.userStatus.energy}{" "}
                  </span>
                  <img src={energy} alt="energy" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xs font-bold opacity-70">
                    x {state.userStatus.diamond}{" "}
                  </span>
                  <img src={diamond} alt="diamond" width={20} />
                </div>
              </div>
              <hr className="border-white w-screen opacity-20" />
            </div>
          </section>
        </section>
      </header>
      <main className="flex flex-col gap-4 items-center justify-center h-screen pt-30">
        <Carousel className="w-full h-150" orientation="vertical">
          <CarouselContent className="w-full h-150">
            {league.map((oponnent, index) => (
              <CarouselItem key={index} className="h-150! pt-8!">
                <div className="flex-none! px-2 w-full h-150!">
                  <Card className="relative w-full h-150! bg-transparent border-none p-0">
                    <span
                      className={`absolute top-2 right-2 z-20 text-black font-bold text-xs px-2 py-1 rounded-2xl ${oponnent.battleLevel === "fácil 1" ? "bg-green-400" : oponnent.battleLevel === "fácil 2" ? "bg-green-400" : oponnent.battleLevel === "fácil 3" ? "bg-green-500" : oponnent.battleLevel === "médio 1" ? "bg-yellow-300" : oponnent.battleLevel === "médio 2" ? "bg-yellow-400" : oponnent.battleLevel === "médio 3" ? "bg-yellow-500" : oponnent.battleLevel === "médio 4" ? "bg-amber-400" : oponnent.battleLevel === "médio 5" ? "bg-amber-600" : oponnent.battleLevel === "dificil 1" ? "bg-red-400" : oponnent.battleLevel === "dificil 2" ? "bg-red-500" : oponnent.battleLevel === "dificil 3" ? "bg-red-600" : oponnent.battleLevel === "dificil 4" ? "bg-red-700" : "bg-linear-60 from-purple-800 to-red-800 text-white!"}`}
                    >
                      {oponnent.battleLevel.toUpperCase()}
                    </span>
                    <img
                      src={oponnent.gym}
                      alt="gym"
                      className={`absolute top-0 left-0 rounded-2xl w-full h-140 object-cover ${oponnent.active ? "opacity-30" : "opacity-30"}`}
                    />
                    <CardContent className="flex rounded-4xl items-center justify-center">
                      <div className="absolute flex flex-col gap-4 items-center justify-center top-24 left-1/2 -translate-1/2 text-white font-bold mt-0!">
                        <h1 className="text-4xl">Ginásio {index + 1}</h1>
                        <h2 className="text-xl">{oponnent.oponnentName}</h2>
                        <div className="flex flex-col gap-2">
                          <span>Recompensas</span>
                          <div className="flex items-center justify-center gap-2">
                            {oponnent.rewards.pokeballs && (
                              <>
                                <span className="text-sm">
                                  + {oponnent.rewards.pokeballs}
                                </span>
                                <img
                                  src={pokebola}
                                  alt="pokeball"
                                  className="w-5"
                                />
                              </>
                            )}
                            {oponnent.rewards.diamond && (
                              <>
                                <span className="text-sm">
                                  + {oponnent.rewards.diamond}
                                </span>
                                <img
                                  src={diamond}
                                  alt="diamond"
                                  className="w-5"
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <img
                        src={oponnent.oponnentImage}
                        alt="oponnent"
                        className={`absolute top-1/2 left-1/2 -translate-1/2 rounded-4xl h-60 object-cover`}
                      />
                      {state.userStatus.xp >= oponnent.xp ? (
                        <div className="flex flex-col gap-2 items-center absolute bottom-15 left-1/2 -translate-x-1/2 w-full">
                          <div className="flex gap-2 font-bold text-white text-center justify-center w-full">
                            <p className="text-sm">Custo para batalhar:</p>
                            <div className="flex gap-1 items-center justify-center">
                              <span>-{oponnent.cost}</span>
                              <img src={token} alt="energy" className="w-5" />
                            </div>
                          </div>
                          <Button
                            text="batalhar"
                            style="text-white! bg-bt-purple!"
                            onClick={() =>
                              handleBattle(oponnent.cost, oponnent.oponnentName)
                            }
                          />
                        </div>
                      ) : (
                        <div className="absolute flex flex-col items-center gap-2 bottom-15 left-1/2 -translate-x-1/2 w-full">
                          <div className="flex gap-2 font-bold text-white text-center justify-center w-full">
                            <p className="text-sm">Custo para batalhar:</p>
                            <div className="flex gap-2 items-center justify-center">
                              <span>-{oponnent.cost}</span>
                              <img src={energy} alt="energy" className="w-5" />
                            </div>
                          </div>
                          <Button
                            text="bloqueado"
                            style=" bg-gray-400! pointer-events-none"
                          />
                          <p className="text-xs text-white text-center">
                            Liberado quando atingir pelo menos {oponnent.xp} XP
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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

              <p className="text-sm text-center text-red-400">
                Você deve ter no mínimo <strong>5 pokémons</strong> capturados e{" "}
                <strong>fichas</strong> suficientes para batalhar.
              </p>
              <p className="font-bold text-sm">Quantidade atual:</p>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1 top-4 right-4">
                  <span className={`text-sm font-bold opacity-70 ${state.myPokemons.length >= 5 ? "text-red-400" : "text-green-400"}`}>
                    x {state.userStatus.token}{" "}
                  </span>
                  <img src={token} alt="token" width={28} />
                </div>
                <p className={`text-sm font-bold opacity-90 ${state.myPokemons.length < 5 ? "text-red-400" : "text-green-400"}`}>Pokémon: {state.myPokemons.length}</p>
              </div>
              <p className="text-sm text-center opacity-70">
                Treine seus pokémons e conclua todas tarefas diárias para ganhar
                fichas de batalha. Passar de nível, evoluir e chegar no nível
                máximo dão mais fichas. Caso ainda não tenha pelo menos 5
                pokémons, use pokébolas e capture-os. Pokébolas são adquiridas
                treinando seus pokémons ou comprando na Loja.
              </p>
              <Button text="treinar pokemons" path="/my-pokemons" />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
