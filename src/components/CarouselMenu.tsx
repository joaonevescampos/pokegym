import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import myPokemonsImage from "../assets/menu-folders/my-pokemons.png";
import battleImage from "../assets/menu-folders/battle.png";
import captureImage from "../assets/menu-folders/capture.png";
import dashboardImage from "../assets/menu-folders/dashboard.png";
import leagueImage from "../assets/menu-folders/league.png";
import specialImage from "../assets/menu-folders/special.png";
import storeImage from "../assets/menu-folders/store.png";
import configImage from "../assets/menu-folders/config.png";
import rouletteImage from "../assets/menu-folders/roulette.png";


const menu = [
  { name: "Meus pokémons", path: "/my-pokemons", folder: myPokemonsImage },
  { name: "Capturar pokémons", path: "/capture-pokemon", folder: captureImage },
  { name: "Batalha", path: "/rocket-team-battle", folder: battleImage },
  { name: "Roleta", path: "/roulette", folder: rouletteImage },
  { name: "Dashboard", path: "/dashboard", folder: dashboardImage },
  {
    name: "Pokémons especiais",
    path: "/special-pokemons",
    folder: specialImage,
  },
  { name: "Loja", path: "/store", folder: storeImage },
  { name: "Liga Pokémon", path: "/pokemon-league", folder: leagueImage },
  { name: "Configurações", path: "/seetings", folder: configImage },

];

function CarouselMenu() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-200 max-lg:max-w-150 max-md:max-w-100 max-sm:max-w-60"
    >
      <CarouselContent>
        {menu.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <Link to={item.path} className="p-1">
              <Card className="relative border-none bg-transparent shadow-2xl hover:scale-105 transition ease-in-out">
                <CardContent className="flex h-50 items-center justify-center p-6 ">
                  <div className="flex items-end pb-4 justify-center absolute w-full h-full z-30 bg-linear-180 from-black/30  to-black/80 rounded-2xl hover:from-black/5 hover:to-black hover:transition hover:ease-in-out hover:shadow-xl hover:shadow-purple-300/10">
                    <span className=" text-white  text-sm font-bold text-center text-shadow-2xl text-shadow-amber-400">
                      {item.name.toLocaleUpperCase()}
                    </span>
                  </div>

                  <img
                    src={item.folder}
                    alt={item.name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-2"
                  />
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white bg-bt-purple border-0" />
      <CarouselNext className="text-white bg-bt-purple border-0" />
    </Carousel>
  );
}

export default CarouselMenu;
