import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background-home.png";
import ivysaurImage from "../assets/bulbasaur.png";
import pokeballImage from "../assets/pokeball-background.png";
import { useState } from "react";
import Button from "@/components/Button";
import xIcon from "../assets/x.png";
import { usePokemon } from "@/context/usePokemon";
import bcrypt from "bcryptjs";

const menu = [
  { name: "Editar perfil" },
  { name: "Controle parental" },
  { name: "Resetar Jogo" },
];

const Seetings = () => {
  const [alertReset, setAlertReset] = useState(false);
  const [alertEdit, setAlertEdit] = useState(false);
  const [alertParentControl, setAlertParentControl] = useState(false);
  const [habilitButton, setHabilitButton] = useState(false);
  const { resetGame } = usePokemon();
  const navigate = useNavigate();
  const { state, setPassword, setUserName, setGender } = usePokemon();
  // const [allowByParents, setAllowByParents] = useState<boolean>(
  //   state.userStatus.password.length === 0 ? true : false,
  // );
  const [error, setError] = useState<boolean | undefined>(undefined);
  const [passwordTyped, setPasswordTyped] = useState("");
  const [userNameTyped, setUserNameTyped] = useState<string>(
    state.userStatus.userName,
  );
  const [genderReact, setGenderReact] = useState<string>(
    state.userStatus.gender,
  );

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

  const validatePassword = (password: string) => {
    const hash = state.userStatus.password;
    console.log(hash);
    bcrypt.compare(password, hash, function (_, result) {
      if (result) {
        setError(false);
        setPasswordTyped("");
      } else {
        setError(true);
        setPasswordTyped("");
      }
    });
  };

  const saltRounds = 10;

  const createHash = (password: string) => {
    bcrypt.genSalt(saltRounds, function (_err, salt) {
      if (salt) {
        bcrypt.hash(password, salt, function (_err, hash) {
          if (hash) {
            setPassword(hash);
            setAlertParentControl(false);
            setPasswordTyped("");
            console.log("hash", hash);
          }
        });
      }
    });
  };

  const deletePassword = () => {
    setPassword("");
    setPasswordTyped("");
    setAlertParentControl(false);
  };

  const handleEditUser = (username: string, gender: string) => {
    setUserName(username);
    setGender(gender);
    setUserNameTyped("");
    setAlertEdit(false);
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
        className="absolute left-0 w-full object-cover h-full opacity-50 z-0"
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
            {menu.map((item, index) =>
              item.name === "Resetar Jogo" ? (
                <li
                  className="w-full min-w-36 min-h-24 bg-red-700 rounded-2xl flex items-center justify-center p-2 h-full text-center font-bold cursor-pointer"
                  key={index}
                  onClick={() => setAlertReset(true)}
                >
                  {item.name}
                </li>
              ) : item.name === "Controle parental" ? (
                <li
                  className="w-full min-w-36 min-h-24 bg-[#00000080] rounded-2xl flex items-center justify-center p-2 h-full text-center font-bold cursor-pointer"
                  key={index}
                  onClick={() => setAlertParentControl(true)}
                >
                  {item.name}
                </li>
              ) : (
                <li
                  className="w-full min-w-36 min-h-24 bg-[#00000080] rounded-2xl flex items-center justify-center p-2 h-full text-center font-bold cursor-pointer"
                  key={index}
                  onClick={() => setAlertEdit(true)}
                >
                  {item.name}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
      {alertReset && (
        <div className="absolute h-full w-full top-0 left-0 bg-[#000000d3] z-20">
          <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-1/2 z-30 w-full max-w-100 max-lg:max-w-72 h-fit bg-gray-900 text-white px-4 py-8 rounded-2xl">
            <span
              className="absolute top-2 right-2 cursor-pointer
              "
              onClick={() => setAlertReset(false)}
            >
              <img src={xIcon} alt="x" className="w-4" />
            </span>
            <h1 className="font-bold text-xl text-center">
              Você tem certeza que deseja resetar o jogo?
            </h1>
            <p className="text-center text-red-400">
              Ao resetar, todo o seu progresso no jogo é apagado{" "}
              <strong className="text-red-500">PERMANENTEMENTE</strong>! Todos
              seus pokémons capturados, experiência, itens, dashboard de
              progresso... tudo é apagado!
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
                className="text-white text-sm cursor-pointer font-extrabold py-2 px-4 bg-red-600 text-center rounded-2xl my-4"
                onClick={() => handleDeleteGame()}
              >
                APAGAR JOGO
              </button>
            )}

            <Button text="Voltar" path="/home" />
          </div>
        </div>
      )}

      {alertParentControl && (
        <div className="absolute h-full w-full top-0 left-0 bg-[#000000d3] z-20">
          <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-1/2 z-30 w-full max-w-100 max-lg:max-w-72 h-fit bg-gray-900 text-white px-4 py-8 rounded-2xl">
            <span
              className="absolute top-2 right-2 cursor-pointer
              "
              onClick={() => setAlertParentControl(false)}
            >
              <img src={xIcon} alt="x" className="w-4" />
            </span>
            <h1 className="font-bold text-xl">Controle parental</h1>
            {state.userStatus.password.length === 0 ? (
              <>
                <p className="text-center font-bold">
                  Controle as tarefas de seu filho definindo uma senha.
                </p>
                <p className="text-center text-sm">
                  Sempre após seu filho concluir todas as tarefas, você pode
                  verificar se tá tudo concluído corretamente e poderá liberar
                  finalização após digitar a senha.
                </p>
                <strong className="text-center text-sm">
                  Anote em algum lugar, pois você não terá mais acesso e não
                  será possível recuperá-la, sendo a única opção deletar o jogo.
                </strong>
                <input
                  type="text"
                  placeholder="crie uma senha"
                  className="bg-white w-full px-4 py-2 rounded-2xl text-black text-center"
                  onChange={(e: any) => setPasswordTyped(e.target.value)}
                />
                {passwordTyped.length > 0 && (
                  <Button
                    text="Confirmar"
                    onClick={() => createHash(passwordTyped)}
                  />
                )}
              </>
            ) : (
              <>
                <span className="font-bold text-green-500">
                  Sua senha já foi definida!
                </span>
                <p className="font-bold text-center">
                  Para alterar, você deve digitar sua senha atual e a nova
                </p>
                <div className="flex flex-col gap-4">
                  {error === true ? (
                    <>
                      <label
                        htmlFor="currPass"
                        className="text-sm opacity-70 text-center -mb-3"
                      >
                        Senha atual
                      </label>

                      <input
                        type="text"
                        placeholder="senha atual"
                        className="bg-white rounded-2xl py-1 px-2 text-center text-black"
                        onChange={(e: any) => setPasswordTyped(e.target.value)}
                      />
                      {passwordTyped.length > 0 && (
                        <Button
                          text="Conferir"
                          style="w-full bg-bt-purple! text-white!"
                          onClick={() => {
                            validatePassword(passwordTyped);
                          }}
                        />
                      )}
                      <p className="text-bold text-red-400 text-center text-sm -mt-3">
                        Senha incorreta
                      </p>
                    </>
                  ) : error === false ? (
                    <>
                      <span className="font-bold text-green-500 text-center">
                        Senha atual correta! Defina sua nova senha.
                      </span>
                      <label
                        htmlFor="currPass"
                        className="text-sm opacity-70 text-center -mb-3"
                      >
                        Senha nova
                      </label>
                      <input
                        type="text"
                        placeholder="senha nova"
                        className="bg-white rounded-2xl py-1 px-2 text-center text-black"
                        onChange={(e: any) => setPasswordTyped(e.target.value)}
                      />

                      {passwordTyped.length > 0 && (
                        <Button
                          text="Confirmar"
                          style="w-full bg-bt-purple! text-white!"
                          onClick={() => {
                            console.log("nova senha", passwordTyped);
                            createHash(passwordTyped);
                          }}
                        />
                      )}
                      <span className="text-center opacity-70">OU</span>
                      <Button
                        text="Desativar controle parental"
                        style="w-full bg-red-500! text-white!"
                        onClick={() => {
                          deletePassword();
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="currPass"
                        className="text-sm opacity-70 text-center -mb-3"
                      >
                        Senha atual
                      </label>
                      <input
                        type="text"
                        placeholder="senha atual"
                        className="bg-white rounded-2xl py-1 px-2 text-center text-black"
                        onChange={(e: any) => setPasswordTyped(e.target.value)}
                      />
                      {passwordTyped && (
                        <Button
                          text="Conferir"
                          style="w-full bg-bt-purple! text-white!"
                          onClick={() => {
                            validatePassword(passwordTyped);
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {alertEdit && (
        <div className="absolute h-full w-full top-0 left-0 bg-[#000000d3] z-20">
          <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-1/2 z-30 w-full max-w-100 max-lg:max-w-72 h-fit bg-gray-900 text-white px-4 py-8 rounded-2xl">
            <span
              className="absolute top-2 right-2 cursor-pointer
              "
              onClick={() => setAlertEdit(false)}
            >
              <img src={xIcon} alt="x" className="w-4" />
            </span>
            <h1>Perfil</h1>
            <label
              htmlFor="name"
              className="text-sm opacity-70 text-center -mb-3"
            >
              Apelido
            </label>
            <input
              type="text"
              placeholder="nome de perfil"
              className="bg-white rounded-2xl py-1 px-2 text-center text-black"
              onChange={(e: any) => {
                if (e.target.value.length <= 10) {
                  setUserNameTyped(e.target.value);
                }
              }}
              value={userNameTyped}
            />
            <label
              htmlFor="name"
              className="text-sm opacity-70 text-center -mb-3"
            >
              Gênero
            </label>
            <div className="flex flex-col items-center gap-2 pb-4 z-30 w-full">
              <span
                className={`${genderReact === "masculino" ? "bg-bt-purple" : "bg-white text-black"} px-4 py-2 rounded-2xl cursor-pointer font-bold w-full text-center`}
                onClick={() => {
                  setGenderReact("masculino");
                }}
              >
                Masculino
              </span>
              <span
                className={`${genderReact === "feminino" ? "bg-bt-purple" : "bg-white text-black"} px-4 py-2 rounded-2xl cursor-pointer font-bold w-full text-center`}
                onClick={() => {
                  setGenderReact("feminino");
                }}
              >
                Feminino
              </span>
              <span
                className={`${genderReact === "" ? "bg-bt-purple" : "bg-white text-black"} px-4 py-2 rounded-2xl cursor-pointer font-bold w-full text-center`}
                onClick={() => {
                  setGenderReact("");
                }}
              >
                Outro
              </span>
            </div>
            <Button
              text="Salvar"
              style="bg-bt-purple! text-white!"
              onClick={() => handleEditUser(userNameTyped, genderReact)}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Seetings;
