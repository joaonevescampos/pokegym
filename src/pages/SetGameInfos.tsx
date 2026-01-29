import Button from "@/components/Button";
import backgroundImage from "../assets/background-home.png";
import charizardImage from "../assets/charizard.png";
import pokeballImage from "../assets/pokeball-background.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "@/context/usePokemon";

const SetGameInfos = () => {
  const [genderReact, setGenderReact] = useState<"masculino" | "feminino" | "">(
    "",
  );
  const [userNameReact, setUserNameReact] = useState<
    "masculino" | "feminino" | ""
  >("");

  const { state, setUserName, setGender } = usePokemon();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.myPokemons.length > 0) {
      navigate("/home");
    }
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    setUserNameReact(e.target.value);
  };

  const handleSetInformations = () => {
    // console.log(userNameReact, genderReact);
    setUserName(userNameReact);
    setGender(genderReact);
  };

  return (
    <main className="w-full h-screen">
      <img
        src={backgroundImage}
        alt="home"
        className="absolute left-0 w-full object-cover h-full opacity-15 z-0"
      />
      <section className="flex flex-col items-center justify-center w-full h-full px-4">
        <div className="flex flex-col gap-4 items-center justify-center text-white px-4 z-10">
          <img
            src={charizardImage}
            alt="charizard"
            className="z-10 max-lg:w-48"
          />
          <img
            src={pokeballImage}
            alt="pokeball"
            className="absolute z-0 w-100"
          />
          <h1 className="text-2xl font-bold z-10">Bem vindo ao POKEGYM</h1>
          <p className="text-center max-w-150 text-sm z-10">
            Seja o maior dos mestres pokemon e embarque nessa aventura!
          </p>
          <p className="text-center font-bold z-10">
            Queremos te conhecer melhor!
          </p>
          <p className="text-center text-sm z-10">Apelido ou primeiro nome:</p>
          <input
            type="text"
            placeholder="digite seu primeiro nome ou apelido"
            className="bg-white text-black py-2 px-4 rounded-2xl z-30 w-full max-w-80 text-center"
            onChange={(e) => handleChange(e)}
          />
          <p className="text-center max-w-150 text-sm z-10">Qual seu gênero?</p>
          <div className="flex gap-4 pb-4 z-30">
            <span
              className={`${genderReact === "masculino" ? "bg-bt-purple" : "bg-white text-black"} px-4 py-2 rounded-2xl cursor-pointer font-bold`}
              onClick={() => {
                setGenderReact("masculino");
              }}
            >
              Masculino
            </span>
            <span
              className={`${genderReact === "feminino" ? "bg-bt-purple" : "bg-white text-black"} px-4 py-2 rounded-2xl cursor-pointer font-bold`}
              onClick={() => {
                setGenderReact("feminino");
              }}
            >
              Feminino
            </span>
            <span
              className={`${genderReact === "" ? "bg-bt-purple" : "bg-white text-black"} px-4 py-2 rounded-2xl cursor-pointer font-bold`}
              onClick={() => {
                setGenderReact("");
              }}
            >
              Outro
            </span>
          </div>
          <div onClick={() => handleSetInformations()}>
            <Button text="Continuar" path="/choose-pokemon" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SetGameInfos;
