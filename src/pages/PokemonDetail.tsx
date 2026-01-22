import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { usePokemon } from "../context/usePokemon";
import pokebola from "../assets/pokeball.png";
import xIcon from "../assets/x.png";
interface ChecklistType {
  task: string;
  checked: boolean;
}

const PokemonDetail = () => {
  const { state, gainXp, gainPokeball, registerMission } = usePokemon();
  const pokemonName = useParams().pokemonName;
  const [pokemonImage, setpokemonImage] = useState("");
  const initialList = [{ task: "escreva sua tarefa aqui", checked: false }];
  const prevList = localStorage.getItem(`${pokemonName}-checklist`);
  const [checklist, setChecklist] = useState<ChecklistType[]>(
    prevList ? JSON.parse(prevList) : initialList,
  );
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const currentPokemon = state.myPokemons.find((p) => p.name === pokemonName);
  const name = currentPokemon?.name ?? "";
  const type = currentPokemon?.type ?? "";
  const xp = currentPokemon?.xp ?? 0;
  const level = currentPokemon?.level ?? 0;
  const dateFunction = new Date();
  const currYear = dateFunction.getFullYear();
  const currMonth = dateFunction.getMonth();
  const currDate = dateFunction.getDate();
  const currDay = dateFunction.getDay();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    formatDate();
  }, []);

  console.log(xp);

  useEffect(() => {
    if (currentPokemon) {
      getPokemonInfos(currentPokemon.name);
    }
  }, [currentPokemon]);

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
    } catch (error) {
      console.log("cannot get pokemon image");
    }
  };

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
    setChecklist(newChecklist);
    localStorage.setItem(
      `${pokemonName}-checklist`,
      JSON.stringify(newChecklist),
    );
  };

  const handleFinish = async () => {
    if (!currentPokemon) return;
    registerMission(currYear, currMonth, currDate);
    const evolved = await gainXp(currentPokemon.name, 1);
    if (evolved) {
      gainPokeball(3);
      navigate(`/pokemon-evolution/${currentPokemon.name}`);
    } else {
      if (
        xp === 10 ||
        xp === 20 ||
        xp === 40 ||
        xp === 50 ||
        xp === 70 ||
        xp === 80 ||
        xp === 90
      ) {
        gainPokeball(1);
      } else if (xp === 100) {
        gainPokeball(5);
      }
      setAlert(true);
    }
  };

  const formatDate = () => {
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

    setDate(`${currDate}, ${month[currMonth]}, ${currYear} - ${week[currDay]}`);
  };

  const handleDeleteItem = (indexToDelete: number) => {
    const newChecklist = checklist.filter(
      (_item, index) => index !== indexToDelete,
    );
    setChecklist(newChecklist);
    localStorage.setItem(
      `${pokemonName}-checklist`,
      JSON.stringify(newChecklist),
    );
  };

  useEffect(() => {
    const savedEndTime = localStorage.getItem(`${pokemonName}-time_to_rest`);

    if (savedEndTime) {
      const endTime = Number(savedEndTime);
      updateTime(endTime);

      const interval = setInterval(() => {
        updateTime(endTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  function formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => String(n).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  function startTimer(seconds: number) {
    const endTime = Date.now() + seconds * 1000;
    localStorage.setItem(`${pokemonName}-time_to_rest`, String(endTime));

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));

      setTimeLeft(remaining);

      if (remaining === 0) {
        localStorage.removeItem(`${pokemonName}-time_to_rest`);
        clearInterval(interval);
      }
    }, 1000);
  }

  function updateTime(endTime: number) {
    const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    setTimeLeft(remaining);

    if (remaining === 0) {
      localStorage.removeItem(`${pokemonName}-time_to_rest`);
    }
  }

  return (
    <>
      {timeLeft > 0 ? (
        <main className="flex items-center justify-center h-screen w-full p-4 text-white">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="animate-float">
              <img
                src={pokemonImage}
                alt="pokemon"
                className="w-52"
              />
              <p className="text-sm font-bold text-center">ZZZ...</p>
            </div>
            <strong className="text-xl text-center text-red-400">
              O {pokemonName?.toUpperCase()} está cansado!
            </strong>
            <strong className="text-sm text-center">
              Espere o tempo para que ele se recupere do treino e possa treinar
              novamente!
            </strong>
            <p className="text-white text-center text-sm opacity-70">
              Tempo restante
            </p>
            <span>{formatTime(timeLeft)}</span>
            <Button text="voltar" path="/my-pokemons" style="text-white!"></Button>
          </div>
        </main>
      ) : (
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
                      : type === "bug"
                        ? "from-yellow-300 to-pink-800"
                        : type === "poison"
                          ? "from-pink-400 to-purple-900"
                          : type === "ground"
                            ? "from-brown-500 to-orange-200"
                            : type === "psychic"
                              ? "from-pink-800 to-purple-600"
                              : type === "ghost"
                                ? "from-purple-800 to-gray-800"
                                : type === "rock"
                                  ? "from-gray-800 to-gray-300"
                                  : type === "ice"
                                    ? "from-blue-200 to-blue-500"
                                    : type === "dragon"
                                      ? "from-orange-400 to-green-400"
                                      : "from-gd-orange to-gd-blue"
            }`}
          >
            <div className="absolute flex items-end gap-2 top-4 left-4">
              <Link to="/my-pokemons" className="text-sm text-white font-bold">
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
              <span className="text-xl font-bold">{name?.toUpperCase()}</span>
              <span
                className={`font-bold text-sm ${
                  type === "electric"
                    ? "bg-amber-500"
                    : type === "grass"
                      ? "bg-emerald-700"
                      : type === "water"
                        ? "bg-blue-700"
                        : type === "fire"
                          ? "bg-red-600"
                          : type === "bug"
                            ? "bg-pink-800"
                            : type === "poison"
                              ? "bg-pink-500"
                              : type === "ground"
                                ? "bg-orange-950"
                                : type === "psychic"
                                  ? "bg-black"
                                  : type === "ghost"
                                    ? "bg-purple-600"
                                    : type === "rock"
                                      ? "bg-gray-800"
                                      : type === "ice"
                                        ? "bg-blue-400"
                                        : type === "dragon"
                                          ? "bg-orange-500"
                                          : "bg-amber-700"
                } text-white rounded-2xl px-2 z-10`}
              >
                {type}
              </span>
              <span className="text-sm opacity-80 font-bold">
                Level: {level === 10 ? "MAX" : level}
              </span>
              <div className="h-3 rounded-4xl bg-gray-800 w-50">
                <hr
                  className={`border-6 rounded-4xl text-green-300`}
                  style={{ width: `${xp === 101 ? "100%" : widthXP}%` }}
                />
              </div>
              <span className="text-sm opacity-80 font-bold">XP: {xp===101 ? "MAX" : xp}</span>
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
                  <li className="flex items-center gap-2" key={index}>
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
                    <button
                      className="flex items-center justify-center opacity-70 rounded-xl cursor-pointer"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <img src={xIcon} alt="delete" className="w-4" />
                    </button>
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
                    setAlert(false);
                    if(xp < 100) {
                      startTimer(3600);
                    }
                  }}
                >
                  <img src={xIcon} alt="x" className="w-4" />
                </span>
                {xp === 10 ||
                xp === 20 ||
                xp === 40 ||
                xp === 50 ||
                xp === 70 ||
                xp === 80 ||
                xp === 90 ? (
                  <>
                    <h2 className="font-bold text-center">
                      Excelente! Você atingiu o nível {level}
                    </h2>
                    <h1 className="font-bold text-sm text-center text-green-400">
                      Oba! Você ganhou +1 pokebola!
                    </h1>
                    <div className="flex items-end gap-2 top-4 right-4">
                      <span className="text-sm font-bold opacity-70">+ 1</span>
                      <img src={pokebola} alt="pokebola" width={28} />
                    </div>
                    <p className="text-sm text-center">
                      Com a pokebola, você pode batalhar contra um pokemon e
                      capturá-lo para fazer parte do seu time!
                    </p>
                  </>
                ) : xp === 100 ? (
                  <>
                    <h1 className="font-bold text-center">
                      UAUUU! Você atingiu o nível máximo: {level}
                    </h1>
                    <h2 className="font-bold text-sm text-center text-green-400">
                      Oba! Você ganhou +5 pokebolas!
                    </h2>
                    <div className="flex items-end gap-2 top-4 right-4">
                      <span className="text-sm font-bold opacity-70">+ 5</span>
                      <img src={pokebola} alt="pokebola" width={28} />
                    </div>
                    <p className="text-sm text-center">
                      Seu {pokemonName?.toUpperCase()} atingiu o nível máximo,
                      portanto não é mais possível ganhar recompensas treinando
                      este pokémon! No entanto, seu pokémon ganhou a habilidade de nunca ficar cansado! Capture e treine outros pokémons para
                      continuar ganhando recompensas.
                    </p>
                    <p className="text-xs text-center text-green-400">
                      DICA: use este pokémon que está bem forte para fazer suas
                      próximas capturas!
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="font-bold text-xl text-center text-green-400 pb-4">
                      Parabéns! Continue sendo produtivo assim!
                    </h1>

                    {xp > 100 ? (
                      <p className="text-sm text-center">
                        Seu {pokemonName?.toUpperCase()} atingiu o nível máximo,
                      portanto não é mais possível ganhar recompensas treinando
                      este pokémon! No entanto, seu pokémon ganhou a habilidade de nunca ficar cansado! Capture e treine outros pokémons para
                      continuar ganhando recompensas.
                      </p>
                    ) : (
                      <p className="text-sm text-center">
                        Se continuar assim verá seu pokémon evoluir e ficar cada
                        vez mais forte!
                      </p>
                    )}
                  </>
                )}

                <Button
                  text="Capturar pokemons"
                  onClick={() => {
                    if(xp < 100) {
                      startTimer(3600);
                    }
                  }}
                  path="/capture-pokemon"
                />
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default PokemonDetail;
