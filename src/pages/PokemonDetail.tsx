import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { usePokemon } from "../context/usePokemon";
import pokebola from "../assets/pokeball.png";
import xIcon from "../assets/x.png";
interface ChecklistType {
  task: string;
  checked: boolean;
}

const PokemonDetail = () => {
  const { state, gainXp, gainPokeball } = usePokemon();
  const pokemonName = useParams().pokemonName;
  const [pokemonImage, setpokemonImage] = useState("");
  const [pokemonData, setPokemonData] = useState({
    name: pokemonName,
    type: "",
    xp: 0,
    level: 0,
  });
  const initialList = [{ task: "escreva sua tarefa aqui", checked: false }];
  const prevList = localStorage.getItem(`${pokemonName}-checklist`);
  const [checklist, setChecklist] = useState<ChecklistType[]>(
    prevList ? JSON.parse(prevList) : initialList,
  );
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    getPokemonInfos(pokemonName!);
    formatDate();
  }, []);

  useEffect(() => {
    if (alert) {
      setChecklist(initialList);
      localStorage.setItem(
        `${pokemonName}-checklist`,
        JSON.stringify(initialList),
      );
    }
  }, [alert]);

  const getPokemonInfos = async (name: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setpokemonImage(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
      );

      const updatePokemonData = state.myPokemons.filter(
        (pokemon) => pokemon.name === pokemonName,
      )[0];
      setPokemonData(updatePokemonData);
    } catch (error) {
      console.log("cannot get pokemon image");
    }
  };

  const { name, type, xp, level } = pokemonData;

  const widthXP = (xp % 10) * 10;

  const handleClick = () => {
    const newChecklist = [...checklist, { task: "", checked: false }];
    console.log(newChecklist);
    setChecklist(newChecklist);
    localStorage.setItem(
      `${pokemonName}-checklist`,
      JSON.stringify(newChecklist),
    );
  };

  const handleChange = (e: any, index: number) => {
    e.preventDefault();
    const newChecklist = checklist.map((item, i) =>
      i === index ? { ...item, task: e.target.value } : item,
    );
    setChecklist(newChecklist);
    localStorage.setItem(
      `${pokemonName}-checklist`,
      JSON.stringify(newChecklist),
    );
  };

  const handleCheck = (e: any, index: number) => {
    const newChecklist = checklist.map((item, i) =>
      i === index ? { ...item, checked: e.target.checked } : item,
    );
    console.log(newChecklist);
    setChecklist(newChecklist);
    localStorage.setItem(
      `${pokemonName}-checklist`,
      JSON.stringify(newChecklist),
    );
  };

  const handleFinish = () => {
    gainXp(name!, 1);
    gainPokeball(1);
    setAlert(true);
  };

  const formatDate = () => {
    const today = new Date();

    const week = [
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado",
    ];
    const month = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    setDate(
      `${today.getDate()}, ${
        month[today.getMonth()]
      }, ${today.getFullYear()} - ${week[today.getDay()]}`,
    );
  };

  return (
    <main className="flex max-lg:flex-col">
      <section
        className={`relative flex-2 max-lg:flex-none flex flex-col items-center justify-center gap-2  max-lg:w-full h-screen max-lg:h-100 bg-linear-to-br ${
          type === "electric"
            ? "from-gd-eletric1 to-gd-eletric2"
            : type === "grass"
              ? "from-gd-grass1 to-gd-grass2"
              : type === "water"
                ? "from-gd-water1 to-gd-water2"
                : type === "fire"
                  ? "from-gd-fire1 to-gd-fire2"
                  : "from-gd-orange to-gd-blue"
        }`}
      >
        <div className="absolute flex items-end gap-2 top-4 left-4">
            <Link to="/my-pokemons" className="text-sm  font-bold opacity-70">
              voltar
            </Link>
          </div>
        <div className="flex flex-col items-center gap-2 text-white">
          {pokemonImage && (
            <img
              src={pokemonImage}
              alt={pokemonName}
              className="w-80 max-lg:w-50"
            />
          )}
          <span className="text-2xl font-bold">{name}</span>
          <span
            className={`font-bold text-sm ${
              type === "electric"
                ? "bg-amber-500"
                : type === "grass"
                  ? "bg-emerald-700"
                  : type === "water"
                    ? "bg-blue-700"
                    : "bg-amber-700"
            }  text-white rounded-2xl px-2 z-10`}
          >
            {type}
          </span>
          <span className="text-sm opacity-80 font-bold">Level: {level}</span>
          <div className="h-3 rounded-4xl bg-gray-800 w-50">
            <hr
              className={`border-6 rounded-4xl text-green-300`}
              style={{ width: `${widthXP}%` }}
            />
          </div>
          <span className="text-sm opacity-80 font-bold">XP: {xp}</span>
        </div>
      </section>
      <section className="flex-3 flex flex-col gap-2 items-center justify-center max-lg:flex-none px-4 py-8">
        <div className="flex flex-col gap-4 w-full max-w-150 max-lg:max-w-100">
          <span className="text-white text-sm opacity-50 font-medium">
            {date}
          </span>
          <p className="text-white text-center text-sm">
            Crie seu checklist do dia, conclua todas suas tarefas e veja seu
            pokemon ganhar experiência a cada dia
          </p>
          <Button
            path="/"
            text="Ver progresso mensal"
            style="w-full text-white my-8"
          />
          <ul className="flex flex-col gap-4 w-full">
            {checklist?.map((item, index) => (
              <li className="flex items-center gap-4" key={index}>
                <input
                  type="checkbox"
                  name={`${index}`}
                  id={`${index}`}
                  className="w-8 h-8 cursor-pointer accent-bt-purple"
                  checked={item.checked}
                  onChange={(e) => handleCheck(e, index)}
                />
                <input
                  type="text"
                  className={`w-full h-8 bg-white rounded-3xl p-4 ${
                    item.checked && "bg-bt-purple! text-white!"
                  }`}
                  defaultValue={item.task}
                  id={`${index}`}
                  name={`${index}`}
                  onChange={(e) => handleChange(e, index)}
                />
              </li>
            ))}
          </ul>
          <Button
            text="Adicionar tarefa"
            style="w-full text-black! bg-gray-400! hover:bg-gray-200!"
            onClick={() => handleClick()}
          />
          {checklist.every((item) => item.checked) && (
            <Button
              text="Finalizar treino"
              style="w-full text-white! bg-green-600! hover:bg-green-900! hover:text-white! mt-8"
              onClick={() => handleFinish()}
            />
          )}
        </div>
      </section>
      {alert && (
        <div className="absolute h-full w-full bg-[#000000d3] z-20">
          <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-1/2 z-30 w-full max-w-100 max-lg:max-w-72 h-fit bg-gray-900 text-white px-4 py-8 rounded-2xl">
            <span
              className="absolute top-2 right-2 cursor-pointer
              "
              onClick={() => {
                window.location.reload();
                setAlert(false);
              }}
            >
              <img src={xIcon} alt="x" className="w-4" />
            </span>
            <h1 className="font-bold text-xl text-center text-green-400">
              Oba! Você ganhou +1 pokebola!
            </h1>
            <div className="flex items-end gap-2 top-4 right-4">
              <span className="text-sm font-bold opacity-70">+ 1</span>
              <img src={pokebola} alt="pokebola" width={28} />
            </div>
            <p className="text-sm text-center">
              Com a pokebola, você pode batalhar contra um pokemon e capturá-lo
              para fazer parte do seu time!
            </p>
            <Button text="Capturar pokemons" path="/capture-pokemon" />
          </div>
        </div>
      )}
    </main>
  );
};

export default PokemonDetail;
