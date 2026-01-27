import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background-home.png";
import ivysaurImage from "../assets/bulbasaur.png";
import pokeballImage from "../assets/pokeball-background.png";
import { useState } from "react";
import Button from "@/components/Button";
import xIcon from "../assets/x.png";
import { usePokemon } from "@/context/usePokemon";

const menu = [{ name: "Resetar Jogo" }];

const Seetings = () => {
  const [alert, setAlert] = useState(false);
  const [habilitButton, setHabilitButton] = useState(false);
  const { resetGame } = usePokemon();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    if (e.target.value === "deletar") {
      setHabilitButton(true);
    } else {
      setHabilitButton(false);
    }
  };

  const handleDeleteGame = () => {
    resetGame();
    navigate("/");
    window.location.reload();
  };

  return (
    <main className="w-full h-screen">
      <div className="absolute flex items-end gap-2 top-4 left-4 text-white">
        <Link to="/home" className="text-sm  font-bold opacity-70 z-10">
          Pokegym
        </Link>
      </div>
      <img
        src={backgroundImage}
        alt="home"
        className="absolute left-0 w-full object-cover h-full opacity-25 z-0"
      />
      <section className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col gap-4 items-center justify-center text-white px-4 z-10">
          <img
            src={ivysaurImage}
            alt="charizard"
            className="z-10 max-lg:w-48"
          />
          <img
            src={pokeballImage}
            alt="pokeball"
            className="absolute z-0 w-100"
          />
          <h1 className="text-2xl font-bold z-10">Configurações</h1>
          <ul className="grid grid-cols-1 gap-4 w-full z-10">
            {menu.map((item, index) => (
              <li
                className="w-full min-w-36 min-h-24 bg-red-700 rounded-2xl flex items-center justify-center p-2 h-full text-center font-bold cursor-pointer"
                key={index}
                onClick={() => setAlert(true)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
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
              Você tem certeza que deseja resetar o jogo?
            </h1>
            <p className="text-center text-red-400">
              Ao resetar, todo o seu progresso no jogo é apagado{" "}
              <strong className="text-red-500">PERMANENTEMENTE</strong>! Todos seus pokémons capturados,
              experiência, itens, dashboard de progresso... tudo é apagado!
            </p>
            <p className="text-center font-bold">
              Para RESETAR o jogo permanentemente, digite "deletar" no campo
              abaixo e clique no botão vermelho "APAGAR JOGO".
            </p>
            <input
              type="text"
              className="bg-white w-full px-4 py-2 rounded-2xl text-black text-center"
              onChange={(e) => handleChange(e)}
            />
            {habilitButton && (
              <button
                className="text-white font-extrabold py-2 px-4 bg-red-600 text-center rounded-2xl my-4"
                onClick={() => handleDeleteGame()}
              >
                APAGAR JOGO
              </button>
            )}

            <Button text="Voltar" path="/home" />
          </div>
        </div>
      )}
    </main>
  );
};

export default Seetings;
