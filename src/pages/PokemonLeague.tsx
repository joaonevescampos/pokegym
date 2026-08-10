import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import pokebola from "../assets/pokeball.png";
import diamond from "../assets/diamond.png";
import token from "../assets/token.png";
import xIcon from "../assets/x.png";
import { usePokemon } from "@/context/usePokemon";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { useState } from "react";
import { trainers1 } from "../data/trainers1";
import { trainers2 } from "../data/trainers2";
import { trainers3 } from "../data/trainers3";
import { trainers4 } from "../data/trainers4";
import backgroundImage from "../assets/menu-folders/league.png";

import Header from "@/components/Header";

const leagues = [
  { name: "Liga 1", xp: 0 },
  { name: "Liga 2", xp: 2500 },
  { name: "Liga 3", xp: 5000 },
  { name: "Liga 4", xp: 10000 },
];

const trainers = [trainers1, trainers2, trainers3, trainers4];

export function PokemonLeague() {
  const { state } = usePokemon();
  const [leagueSelected, setLeagueSelected] = useState<number>(0);
  const [alert, setAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBattle = (cost: number, oponnentName: string) => {
    if (state.myPokemons.length < 5 || state.userStatus.token < cost) {
      setAlert(true);
    } else {
      navigate(
        `/choose-pokemon-league/${leagueSelected}/${oponnentName.toLowerCase()}`,
      );
    }
  };

  const handleSelectLeague = (index: number) => {
    setLeagueSelected(index);
  };

  return (
    <>
      <Header />
      <img
        src={backgroundImage}
        alt="home"
        className="absolute left-0 w-full object-cover h-full opacity-10 z-0"
      />
      <section className="relative text-white pt-30 z-10">
        <ul className="flex justify-center gap-2 px-4 max-w-120 m-auto">
          {leagues.map((league, index) => (
            <li
              className={`flex items-center justify-center h-20 border border-[#FFFFFF80]  w-full rounded-2xl font-bold hover:bg-purple-900 cursor-pointer ${leagueSelected === index ? "bg-bt-purple!" : ""}`}
              onClick={() => handleSelectLeague(index)}
              key={index}
            >
              {league.name}
            </li>
          ))}
        </ul>
      </section>
      <main className="flex flex-col gap-4 items-center justify-center h-fit pt-20 z-10">
        <Carousel className="w-full h-150 max-w-200" orientation="vertical">
          <CarouselContent className="w-full h-150">
            {trainers[leagueSelected].map((oponnent, index) => (
              <CarouselItem key={index} className="h-150! pt-8!">
                <div className="flex-none! px-2 w-full h-150!">
                  <Card className="relative w-full h-150! bg-transparent border-none p-0! m-0!">
                    <span
                      className={`absolute top-2 right-2 z-20 text-black font-bold text-xs px-2 py-1 rounded-2xl ${oponnent.battleLevel === "fácil 1" ? "bg-green-400" : oponnent.battleLevel === "fácil 2" ? "bg-green-400" : oponnent.battleLevel === "fácil 3" ? "bg-green-500" : oponnent.battleLevel === "médio 1" ? "bg-yellow-300" : oponnent.battleLevel === "médio 2" ? "bg-yellow-400" : oponnent.battleLevel === "médio 3" ? "bg-yellow-500" : oponnent.battleLevel === "médio 4" ? "bg-amber-400" : oponnent.battleLevel === "médio 5" ? "bg-amber-600" : oponnent.battleLevel === "dificil 1" ? "bg-red-400" : oponnent.battleLevel === "dificil 2" ? "bg-red-500 text-white" : oponnent.battleLevel === "dificil 3" ? "bg-red-600 text-white" : oponnent.battleLevel === "dificil 4" ? "bg-red-700 text-white" : oponnent.battleLevel === "dificil 5" ? "bg-red-800 text-white" : oponnent.battleLevel === "insano" ? "bg-purple-800 text-white" : oponnent.battleLevel === "mítico" ? "bg-linear-60 from-red-800 to-purple-800 text-white" : oponnent.battleLevel === "divino" ? "bg-linear-60 from-green-800 to-black text-white" : "bg-black shadow-2xs shadow-yellow-300 text-yellow-200"}`}
                    >
                      {oponnent.battleLevel.toUpperCase()}
                    </span>
                    <div className="relative w-full h-full">
                      <img
                        src={oponnent.gym}
                        alt="gym"
                        className={`absolute top-0 left-0 rounded-2xl w-full h-142 object-cover `}
                      />
                      <div className="absolute bg-linear-180 from-black/80 via-black/10 to-black/80 w-full h-142 rounded-2xl z-0"></div>
                    </div>
                    <CardContent className="flex rounded-4xl items-center justify-center">
                      <div className="absolute flex flex-col gap-4 items-center justify-center top-24 left-1/2 -translate-1/2 text-white font-bold mt-0!">
                        <h1 className="text-4xl">Ginásio {index + 1}</h1>
                        <h2 className="text-xl">{oponnent.trainer}</h2>
                        <div className="flex flex-col gap-2">
                          <span className="text-center">Recompensas</span>
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
                        src={oponnent.image}
                        alt="oponnent"
                        className={`absolute top-1/2 left-1/2 -translate-1/2 rounded-4xl h-60 object-cover`}
                      />
                      {state.userStatus.xp >= oponnent.xp ? (
                        <div className="flex flex-col gap-2 items-center absolute bottom-15 left-1/2 -translate-x-1/2 w-full">
                          <div className="flex gap-2 font-bold text-white text-center justify-center w-full">
                            <p className="text-sm">Custo para batalhar:</p>
                            <div className="flex gap-1 items-center justify-center">
                              <span>-{oponnent.cost}</span>
                              <img src={token} alt="token" className="w-5" />
                            </div>
                          </div>
                          <Button
                            text="batalhar"
                            style="text-white! bg-bt-purple!"
                            onClick={() =>
                              handleBattle(oponnent.cost, oponnent.name)
                            }
                          />
                        </div>
                      ) : (
                        <div className="absolute flex flex-col items-center gap-2 bottom-15 left-1/2 -translate-x-1/2 w-full">
                          <div className="flex gap-2 font-bold text-white text-center justify-center w-full">
                            <p className="text-sm">Custo para batalhar:</p>
                            <div className="flex gap-1 items-center justify-center">
                              <span>-{oponnent.cost}</span>
                              <img src={token} alt="token" className="w-5" />
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
                  <span
                    className={`text-sm font-bold opacity-70 ${state.userStatus.token < 10 ? "text-red-400" : ""}`}
                  >
                    x {state.userStatus.token}{" "}
                  </span>
                  <img src={token} alt="token" width={28} />
                </div>
                <p
                  className={`text-sm font-bold opacity-90 ${state.myPokemons.length < 5 ? "text-red-400" : "text-green-400"}`}
                >
                  Pokémon: {state.myPokemons.length}
                </p>
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
