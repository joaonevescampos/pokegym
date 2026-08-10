import pokebola from "../assets/pokeball.png";
import energy from "../assets/energy.png";
import diamond from "../assets/diamond.png";
import xIcon from "../assets/x.png";
import { usePokemon } from "@/context/usePokemon";
import { useState } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import backgroundImage from "../assets/menu-folders/store.png";

type Store = {
  item: string;
  text: string;
  cost: number;
  currency: string;
};

const store = [
  { item: "pokeball", text: "+1 pokebola", cost: 5, currency: "energy" },
  { item: "pokeball", text: "+10 pokebolas", cost: 1, currency: "diamond" },
  { item: "diamond", text: "+1 diamante", cost: 50, currency: "energy" },
  { item: "energy", text: "+50 energias", cost: 1, currency: "diamond" },
];

const Store = () => {
  const {
    state,
    useEnergy,
    useDiamond,
    gainPokeball,
    gainEnergy,
    gainDiamond,
  } = usePokemon();
  const userPokeball = state.userStatus.pokeball;
  const userDiamonds = state.userStatus.diamond;
  const userEnergy = state.userStatus.energy;
  const [failedAlert, setFailedAlert] = useState(false);
  const [successAlert, setSucessAlert] = useState(false);

  const handleBuy = (item: string, cost: number, currency: string) => {
    if (currency === "energy") {
      if (userEnergy < cost) {
        setFailedAlert(true);
      } else {
        useEnergy(cost);
        if (item === "pokeball") {
          gainPokeball(1);
        } else {
          gainDiamond(1);
        }
        setSucessAlert(true);
      }
    } else {
      if (userDiamonds < cost) {
        setFailedAlert(true);
      } else {
        useDiamond(cost);
        if (item === "pokeball") {
          gainPokeball(10);
        } else {
          gainEnergy(50);
        }
        setSucessAlert(true);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="relative flex flex-col items-center justify-center h-screen">
        <img
          src={backgroundImage}
          alt="home"
          className="absolute left-0 w-full object-cover h-full opacity-20 z-0"
        />
        <section className="flex flex-col gap-8 px-4 h-fit z-10">
          <h1 className="text-center text-white font-bold text-2xl">
            Bem vindo a Loja Pokémon!
          </h1>
          <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4">
            {store.map((product) => (
              <div className="flex flex-col gap-4 text-white bg-linear-to-br from-blue-800 to-purple-500 p-4 rounded-2xl">
                <img
                  src={
                    product.item === "pokeball"
                      ? pokebola
                      : product.item === "diamond"
                        ? diamond
                        : energy
                  }
                  alt="product"
                  className="w-16 m-auto"
                />
                <span className="font-bold text-sm text-center">
                  {product.text}
                </span>
                <button
                  className="flex gap-2 m-auto bg-white text-black px-4 py-1 rounded-2xl cursor-pointer"
                  onClick={() =>
                    handleBuy(product.item, product.cost, product.currency)
                  }
                >
                  <span className="font-bold ">x {product.cost}</span>
                  <img
                    src={product.currency === "energy" ? energy : diamond}
                    alt=""
                    className="w-6"
                  />
                </button>
              </div>
            ))}
          </div>
        </section>
        {failedAlert && (
          <div className="absolute h-full w-full top-0 left-0 bg-[#000000d3] z-20">
            <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-1/2 z-30 w-full max-w-100 max-lg:max-w-72 h-fit bg-gray-900 text-white px-4 py-8 rounded-2xl">
              <span
                className="absolute top-2 right-2 cursor-pointer
              "
                onClick={() => setFailedAlert(false)}
              >
                <img src={xIcon} alt="x" className="w-4" />
              </span>
              <h1 className="font-bold text-xl text-center">
                Poxa, você não tem recursos suficientes para comprar este item!
              </h1>
              <p>Seus recursos no momento: </p>
              <div className="flex gap-4">
                <div className="flex items-end gap-2 top-4 right-4">
                  <span className="text-sm font-bold opacity-70">
                    x {userEnergy}{" "}
                  </span>
                  <img src={energy} alt="energy" width={28} />
                </div>
                <div className="flex items-end gap-2 top-4 right-4">
                  <span className="text-sm font-bold opacity-70">
                    x {userDiamonds}{" "}
                  </span>
                  <img src={diamond} alt="diamond" width={28} />
                </div>
              </div>
              <p className="text-sm text-center">
                Treine seus pokémons para ganhar diamantes e capture pokémons
                para ganhar energia. Batalhar contra a equipe Rocket também dá
                recursos como energia ou pokébola.
              </p>
              <Button text="treinar pokemons" path="/my-pokemons" />
            </div>
          </div>
        )}
        {successAlert && (
          <div className="absolute h-full w-full top-0 left-0 bg-[#000000d3] z-20">
            <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-1/2 z-30 w-full max-w-100 max-lg:max-w-72 h-fit bg-gray-900 text-white px-4 py-8 rounded-2xl">
              <span
                className="absolute top-2 right-2 cursor-pointer
              "
                onClick={() => setSucessAlert(false)}
              >
                <img src={xIcon} alt="x" className="w-4" />
              </span>
              <h1 className="font-bold text-xl text-center text-green-500">
                Compra feita com sucesso!
              </h1>
              <p>Veja seus recursos agora: </p>
              <div className="flex gap-4">
                <div className="flex items-end gap-2 top-4 right-4">
                  <span className="text-sm font-bold opacity-70">
                    x {userPokeball}{" "}
                  </span>
                  <img src={pokebola} alt="pokeball" width={28} />
                </div>
                <div className="flex items-end gap-2 top-4 right-4">
                  <span className="text-sm font-bold opacity-70">
                    x {userEnergy}{" "}
                  </span>
                  <img src={energy} alt="energy" width={28} />
                </div>
                <div className="flex items-end gap-2 top-4 right-4">
                  <span className="text-sm font-bold opacity-70">
                    x {userDiamonds}{" "}
                  </span>
                  <img src={diamond} alt="diamond" width={28} />
                </div>
              </div>
              <p className="text-sm text-center">
                Continue treinando e captrando pokémons para ter mais recursos!
              </p>
              <Button text="treinar pokemons" path="/my-pokemons" />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Store;
