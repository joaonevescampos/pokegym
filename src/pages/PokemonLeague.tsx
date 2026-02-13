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
import maleProfile from "../assets/male-profile.png";
import femaleProfile from "../assets/female-profile.png";
import { usePokemon } from "@/context/usePokemon";
import { Link } from "react-router-dom";
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

const league = [
  {
    gym: gym3,
    oponnentName: "Brock",
    oponnentImage: brock,
    rewards: { pokeballs: 3 },
    battleLevel: "iniciante",
    xp: 0,
    active: true,
    cost: 5,
  },
  {
    gym: gym5,
    oponnentName: "Misty",
    oponnentImage: misty,
    rewards: { pokeballs: 5 },
    battleLevel: "iniciante",
    xp: 200,
    active: false,
    cost: 7,
  },
  {
    gym: gym2,
    oponnentName: "Surge",
    oponnentImage: surge,
    rewards: { pokeballs: 10 },
    battleLevel: "iniciante",
    xp: 400,
    active: false,
    cost: 10,
  },
  {
    gym: gym1,
    oponnentName: "Erika",
    oponnentImage: erika,
    rewards: { pokeballs: 15 },
    battleLevel: "intermediário",
    xp: 600,
    active: false,
    cost: 12,
  },
  {
    gym: gym4,
    oponnentName: "Koga",
    oponnentImage: koga,
    rewards: { pokeballs: 20 },
    battleLevel: "intermediário",
    xp: 800,
    active: false,
    cost: 15,
  },
  {
    gym: gym6,
    oponnentName: "Sabrina",
    oponnentImage: sabrina,
    rewards: { diamond: 1, pokeballs: 20 },
    battleLevel: "intermediário",
    xp: 1000,
    active: false,
    cost: 20,
  },
  {
    gym: gym7,
    oponnentName: "Blaine",
    oponnentImage: blaine,
    rewards: { pokeballs: 20, diamond: 2 },
    battleLevel: "intermediário",
    xp: 1200,
    active: false,
    cost: 25,
  },
  {
    gym: gym8,
    oponnentName: "giovanni",
    oponnentImage: giovanni,
    rewards: { pokeballs: 20, diamond: 3 },
    battleLevel: "Difícil",
    xp: 1400,
    active: false,
    cost: 30,
  },
  {
    gym: gym9,
    oponnentName: "Lorelei",
    oponnentImage: lorelei,
    rewards: { diamond: 4, pokeballs: 20 },
    battleLevel: "Difícil",
    xp: 1600,
    active: false,
    cost: 35,
  },
  {
    gym: gym9,
    oponnentName: "bruno",
    oponnentImage: bruno,
    rewards: { pokeballs: 20, diamond: 5 },
    battleLevel: "Difícil",
    xp: 1800,
    active: false,
    cost: 40,
  },
  {
    gym: gym9,
    oponnentName: "agatha",
    oponnentImage: agatha,
    rewards: { pokeballs: 20, diamond: 6 },
    battleLevel: "Difícil",
    xp: 2000,
    active: false,
    cost: 45,
  },
  {
    gym: gym9,
    oponnentName: "Lance",
    oponnentImage: lance,
    rewards: { pokeballs: 20, diamond: 7 },
    battleLevel: "Difícil",
    xp: 2200,
    active: false,
    cost: 50,
  },
  {
    gym: gym9,
    oponnentName: "Gary",
    oponnentImage: gary,
    rewards: { pokeballs: 30, diamond: 10 },
    battleLevel: "Insano",
    xp: 2400,
    active: false,
    cost: 50,
  },
];

export function PokemonLeague() {
  const { state } = usePokemon();
  return (
    <>
      <header className="relative w-full h-fit text-white pt-4">
        <section>
          <div className="absolute flex items-end gap-2 top-4 left-4">
            <Link to="/home" className="text-sm  font-bold opacity-70">
              Pokegym
            </Link>
          </div>
          <section className="absolute flex flex-col items-end gap-2 top-4 right-4">
            <div className="flex gap-4 items-center pb-2">
              <div className="flex items-end gap-2">
                <div className="flex items-end gap-1">
                  <span className="text-sm font-bold opacity-70">
                    x {state.userStatus.pokeball}{" "}
                  </span>
                  <img src={pokebola} alt="pokebola" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-sm font-bold opacity-70">
                    x {state.userStatus.energy}{" "}
                  </span>
                  <img src={energy} alt="energy" width={20} />
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-sm font-bold opacity-70">
                    x {state.userStatus.diamond}{" "}
                  </span>
                  <img src={diamond} alt="diamond" width={20} />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col items-end">
                  <span className="font-bold text-xs">
                    {state.userStatus.userName}
                  </span>
                  <span className="opacity-60 font-bold text-xs">
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
            </div>
          </section>
          <div className="absolute flex flex-col items-end gap-2 top-4 right-4"></div>
        </section>
      </header>
      <main className="flex flex-col gap-4 items-center justify-center h-screen pt-20">
        <Carousel className="w-full h-180" orientation="vertical">
          <CarouselContent className="w-full h-180">
            {league.map((oponnent, index) => (
              <CarouselItem key={index} className="h-180! pt-8!">
                <div className="flex-none! px-2 w-full h-180!">
                  <Card className="relative w-full h-180! bg-transparent border-none p-0">
                    <img
                      src={oponnent.gym}
                      alt="gym"
                      className={`absolute top-0 left-0 rounded-2xl w-full h-170 object-cover ${oponnent.active ? "opacity-30" : "opacity-30"}`}
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
                        className={`absolute top-1/2 left-1/2 -translate-1/2 rounded-4xl h-70 object-cover`}
                      />
                      {state.userStatus.xp >= oponnent.xp ? (
                        <div className="flex flex-col gap-2 items-center absolute bottom-20 left-1/2 -translate-x-1/2 w-full">
                          <div className="flex gap-2 font-bold text-white text-center justify-center w-full">
                            <p className="text-sm">Custo para batalhar:</p>
                            <div className="flex gap-2 items-center justify-center">
                              <span>-{oponnent.cost}</span>
                              <img src={energy} alt="energy" className="w-5" />
                            </div>
                          </div>
                          <Button
                            text="batalhar"
                            style="text-white! bg-bt-purple!"
                            path={`/choose-pokemon-league/${oponnent.oponnentName.toLowerCase()}`}
                          />
                        </div>
                      ) : (
                        <div className="absolute flex flex-col items-center gap-2 bottom-35 left-1/2 -translate-x-1/2 w-full">
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
      </main>
    </>
  );
}
